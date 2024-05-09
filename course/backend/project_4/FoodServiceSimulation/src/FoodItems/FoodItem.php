<?php
namespace FoodItems;

abstract class FoodItem{
    private string $name;
    private float $price;
    private string $description;
    private int $cookingTime;

    public function __construct(string $name, string $description, float $price, int $cookingTime){
        $this->name = $name;
        $this->description = $description;
        $this->price = $price;
        $this->cookingTime = $cookingTime;
    }

    public function getName(): string{
        return $this -> name;
    }

    public function getDescription(): string {
        return $this -> description;
    }

    public function getPrice(): float{
        return $this -> price;
    }

    public function getCookingTime(): int{
        return $this->cookingTime;
    }

    abstract public static function getCategory(): string;

}