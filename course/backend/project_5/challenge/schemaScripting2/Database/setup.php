<?php
use Database\MYSQLWrapper;

$mysqli = new MySQLWrapper();



$result = $mysqli->query(file_get_contents(__DIR__ . '/../Examples/create/user.sql'));
$result = $mysqli->query(file_get_contents(__DIR__ . '/../Examples/create/post.sql'));
$result = $mysqli->query(file_get_contents(__DIR__ . '/../Examples/create/comment.sql'));
$result = $mysqli->query(file_get_contents(__DIR__ . '/../Examples/create/postLike.sql'));
$result = $mysqli->query(file_get_contents(__DIR__ . '/../Examples/create/commentLike.sql'));
$result = $mysqli->query(file_get_contents(__DIR__ . '/../Examples/create/userSetting.sql'));
$result = $mysqli->query(file_get_contents(__DIR__ . '/../Examples/create/category.sql'));
$result = $mysqli->query(file_get_contents(__DIR__ . '/../Examples/create/tag.sql'));
$result = $mysqli->query(file_get_contents(__DIR__ . '/../Examples/create/postTag.sql'));



/*
$result = $mysqli->query("
    CREATE TABLE IF NOT EXISTS cars (
      id INT PRIMARY KEY AUTO_INCREMENT,
      make VARCHAR(50),
      model VARCHAR(50),
      year INT,
      color VARCHAR(20),
      price FLOAT,
      mileage FLOAT,
      transmission VARCHAR(20),
      engine VARCHAR(20),
      status VARCHAR(10)
    );
");
*/


if ($result == false) throw new Exception('Could not execute query.');
else print("Successfully ran all SQL setup queries.".PHP_EOL);

