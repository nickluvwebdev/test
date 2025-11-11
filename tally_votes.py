# tally_votes.py
from db_connector import get_db_connection
from crypto_utils import load_private_key, rsa_encrypt_key, load_public_key
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
import hashlib

def decrypt_vote(aes_key: bytes, nonce: bytes, ciphertext: bytes) -> str:
    """AES-GCM decryption"""
    aes = AESGCM(aes_key)
    plaintext = aes.decrypt(nonce, ciphertext, None)
    return plaintext.decode()

def tally_votes():
    db = get_db_connection()
    cur = db.cursor()

    cur.execute("SELECT encrypted_vote, aes_nonce, aes_key_encrypted, vote_hash FROM votes")
    rows = cur.fetchall()
    db.close()

    priv_key = load_private_key()
    results = {}
    total = 0

    for (ciphertext, nonce, enc_key, vote_hash) in rows:
        # unwrap AES key
        try:
            aes_key = priv_key.decrypt(
                enc_key,
                padding.OAEP(
                    mgf=padding.MGF1(algorithm=hashes.SHA256()),
                    algorithm=hashes.SHA256(),
                    label=None
                )
            )
        except Exception as e:
            print("❌ RSA decrypt failed:", e)
            continue

        # verify hash integrity
        digest = hashlib.sha256(ciphertext).hexdigest()
        if digest != vote_hash:
            print("⚠️ Tampered vote detected — skipping.")
            continue

        # decrypt actual vote
        try:
            candidate = decrypt_vote(aes_key, nonce, ciphertext)
            total += 1
            results[candidate] = results.get(candidate, 0) + 1
        except Exception as e:
            print("❌ AES decrypt failed:", e)

    print("\n===== 🗳️ Election Results 🗳️ =====")
    if not results:
        print("No valid votes found.")
    else:
        for candidate, count in results.items():
            print(f"Candidate ID {candidate}: {count} vote(s)")
        print(f"Total votes counted: {total}")

if __name__ == "__main__":
    tally_votes()