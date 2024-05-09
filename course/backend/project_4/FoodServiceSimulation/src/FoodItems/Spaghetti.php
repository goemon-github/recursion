<?php
namespace FoodItems;

use FoodItems\FoodItem;

class Spaghetti extends FoodItem{
    private string $category = 'spaghetti';
    
    public function __construct()
    {
        parent::__construct(
            "Spaghetti",
            "This is a type of pasta, a noodle used in Italian cuisine.",
            13.0,
            10
        );        
    }

    public static function getCategory(): string{
        return self::$category;
    }
}