CREATE TABLE IF NOT EXISTS cars_parts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    car_id INT ,
    name VARCHAR(50),
    description VARCHAR(50),
    price FLOAT,
    quantityInStock INT, 
    FOREIGN KEY (car_id) REFERENCES cars(id)
);