CREATE TABLE IF NOT EXISTS commentLike (
    user_id INT,
    comment_id INT,
    PRIMARY KEY (user_id, comment_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (comment_id) REFERENCES comment(comment_id)
)