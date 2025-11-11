# app.py
from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from db_connector import get_db_connection
from crypto_utils import aes_encrypt, rsa_encrypt_key, load_public_key
import os, bcrypt, hashlib, random, string

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET", "dev-secret")

# ----------------- In-memory OTP state (demo only) -----------------
PENDING = {}

def make_otp():
    return "".join(random.choices(string.digits, k=6))

# ----------------- DB helpers -----------------
def fetch_voter(voter_id: str):
    db = get_db_connection(); cur = db.cursor()
    cur.execute("SELECT id, voter_id, phone_number, password, has_voted FROM voters WHERE voter_id=%s", (voter_id,))
    row = cur.fetchone()
    db.close()
    return row

def voter_exists(voter_id: str) -> bool:
    return fetch_voter(voter_id) is not None

def insert_voter(voter_id: str, phone: str, password_hash: bytes):
    db = get_db_connection(); cur = db.cursor()
    cur.execute(
        "INSERT INTO voters (voter_id, phone_number, password, has_voted) VALUES (%s, %s, %s, 0)",
        (voter_id, phone, password_hash)
    )
    db.commit(); db.close()

def load_candidates_for_template():
    party_code_map = {"Unity Party":"UP","Chill Party":"CP","True Change Party":"TC","Forward Party":"FP"}
    party_color_map = {
        "Unity Party":"#4F46E5",
        "Chill Party":"#E11D48",
        "True Change Party":"#0F9D58",
        "Forward Party":"#16A34A"
    }

    db = get_db_connection(); cur = db.cursor()
    cur.execute("SELECT candidate_id, ballot_number, candidate_name FROM candidates ORDER BY ballot_number")
    rows = cur.fetchall(); db.close()

    out = []
    for cid, bn, fullname in rows:
        person, party = (fullname.split(" - ", 1) + [""])[:2] if " - " in fullname else (fullname, "")
        initials = "".join(w[0] for w in person.split()[:2]).upper() if person else "NA"
        out.append({
            "id": cid,
            "name": person,
            "party": party or f"No.{bn}",
            "initials": initials,
            "badge": party_code_map.get(party, f"N{bn}"),
            "color": party_color_map.get(party, "#6B7280"),
        })
    return out


# ----------------- Routes -----------------
@app.get("/")
def home():
    return redirect(url_for("login_page"))

# ============ 1) LOGIN ============
@app.get("/login", endpoint="login_page")
def login_get():
    return render_template("login.html")

@app.post("/login", endpoint="login_get")
def login_post():
    voter_id = request.form.get("voter_id","").strip()
    password = request.form.get("password","")

    row = fetch_voter(voter_id)
    if not row:
        flash("No such citizen ID.", "error")
        return redirect(url_for("login_page"))

    stored_hash = row[3]
    if isinstance(stored_hash, str):
        stored_hash = stored_hash.encode("utf-8")

    if bcrypt.checkpw(password.encode("utf-8"), stored_hash):
        session["voter_id"] = voter_id
        flash("Login successful.", "success")
        return redirect(url_for("vote_page"))
    else:
        flash("Incorrect password.", "error")
        return redirect(url_for("login_page"))

@app.get("/logout")
def logout():
    session.clear()
    flash("You have been logged out.", "info")
    return redirect(url_for("login_page"))

# ============ 2) REGISTER ============
@app.get("/register", endpoint="register_get")
def register_get():
    return render_template("register.html")

@app.post("/register", endpoint="register_post")
def register_post():
    voter_id = (request.form.get("voter_id") or "").strip()
    phone    = (request.form.get("phone_number") or "").strip()
    pw       = request.form.get("password") or ""
    pw2      = request.form.get("confirm_password") or ""

    if not voter_id.isdigit() or len(voter_id) != 13:
        flash("Citizen ID must be 13 digits.", "error")
        return redirect(url_for("register_get"))
    digits_phone = "".join(ch for ch in phone if ch.isdigit())
    if len(digits_phone) != 10:
        flash("Phone number must be 10 digits.", "error")
        return redirect(url_for("register_get"))
    if pw != pw2:
        flash("Passwords do not match.", "error")
        return redirect(url_for("register_get"))
    if voter_exists(voter_id):
        flash("This citizen ID is already registered. Please log in.", "info")
        return redirect(url_for("login_page"))

    password_hash = bcrypt.hashpw(pw.encode("utf-8"), bcrypt.gensalt(rounds=12))
    otp = make_otp()
    PENDING[voter_id] = {
        "otp": otp,
        "phone": digits_phone,
        "password_hash": password_hash,
    }
    session["pending_voter_id"] = voter_id

    flash(f"Demo OTP (for testing): {otp}", "info")
    return redirect(url_for("otp_get"))

# ============ 3) OTP ============
@app.get("/otp", endpoint="otp_get")
def otp_get():
    if not session.get("pending_voter_id"):
        flash("No pending verification. Please register first.", "info")
        return redirect(url_for("register_get"))
    return render_template("otp.html")

@app.post("/otp", endpoint="otp_post")
def otp_post():
    voter_id = session.get("pending_voter_id")
    if not voter_id or voter_id not in PENDING:
        flash("Verification session expired. Please register again.", "error")
        return redirect(url_for("register_get"))

    digits = "".join((request.form.get(f"d{i}") or "") for i in range(1,7))
    digits = "".join(ch for ch in digits if ch.isdigit())[:6]

    if digits == PENDING[voter_id]["otp"]:
        try:
            insert_voter(voter_id, PENDING[voter_id]["phone"], PENDING[voter_id]["password_hash"])
        finally:
            PENDING.pop(voter_id, None)
            session.pop("pending_voter_id", None)
        flash("Phone verified. You can now log in.", "success")
        return redirect(url_for("login_page"))
    else:
        flash("Invalid OTP. Please try again.", "error")
        return redirect(url_for("otp_get"))

@app.post("/otp/resend", endpoint="otp_resend")
def otp_resend():
    voter_id = session.get("pending_voter_id")
    if not voter_id or voter_id not in PENDING:
        return jsonify({"ok": False, "msg": "No pending verification"}), 400
    new_otp = make_otp()
    PENDING[voter_id]["otp"] = new_otp
    return jsonify({"ok": True, "otp": new_otp})

# ============ 4) VOTE ============
@app.route("/vote", methods=["GET", "POST"], endpoint="vote_page")
def vote_page():
    voter_id = session.get("voter_id")
    if not voter_id:
        flash("Please login first.", "info")
        return redirect(url_for("login_page"))

    voter_row = fetch_voter(voter_id)
    if not voter_row:
        session.clear()
        flash("Session invalid. Please login again.", "error")
        return redirect(url_for("login_page"))

    db_id, _, _, _, has_voted = voter_row

    if request.method == "GET":
        candidates = load_candidates_for_template()
        return render_template("vote.html", candidates=candidates)

    if has_voted == 1:
        return render_template("status.html", status="bad")

    try:
        candidate_id = int(request.form.get("candidate") or 0)
    except ValueError:
        flash("Invalid candidate.", "error")
        return redirect(url_for("vote_page"))

    plaintext = str(candidate_id).encode("utf-8")
    try:
        aes_key, nonce, ciphertext = aes_encrypt(plaintext)
        pub_key = load_public_key()
        enc_key = rsa_encrypt_key(pub_key, aes_key)
        vote_hash = hashlib.sha256(ciphertext).hexdigest()
    except Exception as e:
        flash(f"Encryption error: {e}", "error")
        return redirect(url_for("vote_page"))

    db = get_db_connection(); cur = db.cursor()
    try:
      
        cur.execute("""
            INSERT INTO votes (encrypted_vote, aes_nonce, aes_key_encrypted, vote_hash)
            VALUES (%s, %s, %s, %s)
        """, (ciphertext, nonce, enc_key, vote_hash))

        cur.execute("INSERT INTO votes_count (candidate_id) VALUES (%s)", (candidate_id,))

        cur.execute("UPDATE voters SET has_voted=1 WHERE voter_id=%s", (voter_id,))
        db.commit()
    except Exception as e:
        db.rollback()
        flash(f"Failed to record your vote: {e}", "error")
        db.close()
        return render_template("status.html", status="bad")
    db.close()

    return render_template("status.html", status="ok")

# ============ 5) STATUS ============
@app.get("/status")
def status_page():
    voter_id = session.get("voter_id")
    if not voter_id:
        flash("Please login first.", "info")
        return redirect(url_for("login_page"))
    row = fetch_voter(voter_id)
    if not row:
        flash("Session invalid.", "error")
        return redirect(url_for("login_page"))
    return render_template("status.html", status=("ok" if row[4] == 1 else "bad"))

# ----------------- Entrypoint -----------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=True)
