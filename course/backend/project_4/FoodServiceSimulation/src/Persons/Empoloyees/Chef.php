<?php
namespace Persons\Empoloyees;

use FoodOrders\FoodOrder;
use Persons\Empoloyees\Empoloyee;

class Chef extends Empoloyee{
    public function __construct(string $name, int $age, string $address, int $employeeld, float $salay)
    {
       parent::__construct($name, $age, $address, $employeeld, $salay) ;
    }

    public function  prepareFood(FoodOrder $foodOrder): string{
        $totalTime = 0;
        foreach($foodOrder->getItems() as $item){
           echo "{$this->getName()} was cooking {$item->getName()}...\n" ;
           $totalTime += $item->getCookingTime();
        }
        return $this->getName()." took ".$totalTime." minutes to cook.\n";
    }
}