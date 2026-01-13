from sqlalchemy import create_engine, text

# Connect to MySQL server (without database)
engine = create_engine("mysql+pymysql://akshay:AKS%402025elite@localhost:3306")

with engine.connect() as connection:
    # Create database
    connection.execute(text("CREATE DATABASE IF NOT EXISTS osam_tourism CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"))
    connection.commit()
    print("Database created successfully!")