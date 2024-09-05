CREATE TABLE IF NOT EXISTS user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(30),
    email_confirmed_at VARCHAR(50),
    created_at DATE,
    updated_at DATE
)