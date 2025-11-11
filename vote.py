# vote.py
from db_connector import get_db_connection
from crypto_utils import aes_encrypt, rsa_encrypt_key, load_public_key
import hashlib

def cast_vote(voter_id: str, candidate_id: int):
    db = get_db_connection()
    cursor = db.cursor()

    # --- check if already voted ---
    cursor.execute("SELECT has_voted FROM voters WHERE voter_id = %s", (voter_id,))
    row = cursor.fetchone()
    if not row:
        print("❌ No such voter")
        return
    if row[0] == 1:
        print("⚠️  You already voted!")
        return

    # --- encrypt the vote ---
    plaintext = str(candidate_id).encode()
    aes_key, nonce, ciphertext = aes_encrypt(plaintext)
    pub_key = load_public_key()
    enc_key = rsa_encrypt_key(pub_key, aes_key)

    # optional integrity hash
    vote_hash = hashlib.sha256(ciphertext).hexdigest()

    # --- insert encrypted vote & update voter flag ---
    cursor.execute("""
        INSERT INTO votes (encrypted_vote, aes_nonce, aes_key_encrypted, vote_hash)
        VALUES (%s, %s, %s, %s)
    """, (ciphertext, nonce, enc_key, vote_hash))
    cursor.execute("UPDATE voters SET has_voted = 1 WHERE voter_id = %s", (voter_id,))
    db.commit()
    db.close()
    print("✅ Vote recorded securely!")

if __name__ == "__main__":
    cast_vote("V001", 2)   # test voter V001 voting candidate id 2