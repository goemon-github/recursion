<?php
namespace FoodItems;

use FoodItems\FoodItem;

class Fettuccine extends FoodItem{
    private string $category = 'pasta';

    public function __construct()
    {
        parent::__construct(
            "Fettuccine",
            "This is popular in Tuscan and Roman cuisine.",
            10.0,
            10
        );        
    }

    public static function getCategory(): string{
        return self::$category;
    }
}