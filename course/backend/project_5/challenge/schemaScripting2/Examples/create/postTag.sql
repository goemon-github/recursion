CREATE TABLE IF NOT EXISTS postTag(
    post_id INT,
    tag_id INT,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id), 
    FOREIGN KEY (tag_id) REFERENCES tag(tag_id)
)