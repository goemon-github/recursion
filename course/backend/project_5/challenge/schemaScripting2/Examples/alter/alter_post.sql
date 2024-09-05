ALTER TABLE post ADD (
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
)