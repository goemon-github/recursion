<?php 
namespace FoodItems;

use FoodItems\FoodItem;

class HawaiianPizza extends FoodItem{
    private string $category = 'pizza';
    
    public function __construct()
    {
        parent::__construct(
            "HawaiianPizza",
            "This is a pizza made with tomato sauce, cheese, pineapple, and ham.",
            20.0,
            8
        );        
    }

    public static function getCategory(): string{
        return self::$category;
    }
}