<?php
namespace FoodItems;

use FoodItems\FoodItem;

class CheeseBuger extends FoodItem{
    private string $category = 'buger';

    public function __construct()
    {
        parent::__construct(
            "CheeseBurger",
            "This is a hamburger with cheese added.",
            15.0,
            5,
        );        
    }

    public static function getCategory(): string{
        return self::$category;
    }
}