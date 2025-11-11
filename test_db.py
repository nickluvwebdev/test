from db_connection import get_db_connection

db = get_db_connection()
cursor = db.cursor()

cursor.execute("SHOW TABLES;")
for x in cursor.fetchall():
    print(x)

db.close()
