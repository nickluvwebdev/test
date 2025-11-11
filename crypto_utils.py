# crypto_utils.py
import secrets
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding

def load_public_key():
    with open("keys/public.pem", "rb") as f:
        return serialization.load_pem_public_key(f.read())

def load_private_key():
    with open("keys/private.pem", "rb") as f:
        return serialization.load_pem_private_key(f.read(), password=None)

def aes_encrypt(plaintext: bytes):
    key = AESGCM.generate_key(bit_length=256)
    aes = AESGCM(key)
    nonce = secrets.token_bytes(12)
    ciphertext = aes.encrypt(nonce, plaintext, None)
    return key, nonce, ciphertext

def rsa_encrypt_key(public_key, aes_key: bytes):
    return public_key.encrypt(
        aes_key,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
