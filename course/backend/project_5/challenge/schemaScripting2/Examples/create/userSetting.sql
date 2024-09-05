CREATE TABLE IF NOT EXISTS userSetting(
    entry_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    meta_key VARCHAR(50),
    meta_value VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
)