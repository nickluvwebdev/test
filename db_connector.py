import mysql.connector

def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",             # change if your MySQL user is different
        password="Nick",# your MySQL password
        database="v_election" # your existing DB name
    )
    return connection
