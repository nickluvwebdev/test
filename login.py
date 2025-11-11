# login.py (corrected)
from db_connector import get_db_connection
import bcrypt

def login_voter(voter_id, password):
    db = get_db_connection()
    cursor = db.cursor()

    # fetch the stored password hash + vote flag
    sql = "SELECT password, has_voted FROM voters WHERE voter_id = %s"
    cursor.execute(sql, (voter_id,))
    result = cursor.fetchone()
    db.close()

    if not result:
        print("❌ No such voter ID found.")
        return False

    # result holds (password, has_voted)
    stored_hash, has_voted = result

    # bcrypt expects bytes
    if isinstance(stored_hash, str):
        stored_hash = stored_hash.encode('utf-8')

    # compare passwords
    if bcrypt.checkpw(password.encode('utf-8'), stored_hash):
        print("✅ Login successful!")
        if has_voted:
            print("⚠️  This voter has already voted.")
        else:
            print("🗳️  Ready to vote.")
        return True
    else:
        print("❌ Incorrect password.")
        return False


# ---- test the login ----
if __name__ == "__main__":
    login_voter("V001", "mypassword123")   # replace with your test voter_id & password
 