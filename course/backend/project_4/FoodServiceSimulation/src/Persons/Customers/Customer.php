<?php
namespace Persons\Customers;

use Invoices\Invoice;
use Persons\Person;
use Restaurants\Restaurant; 

class Customer extends Person{
    private array $interestedTastesMap;

    public function __construct(string $name, int $age, string $address, array $interestedTastesMap)
    {
        parent::__construct($name, $age, $address);
        $this->interestedTastesMap = $interestedTastesMap;
    }

    public function interestedCategories(Restaurant $restaurant): array {
        $orderCategories = [];

        foreach($this->interestedTastesMap as $key => $num){
           if($restaurant->hasManu($key)){
                for($i = 0; $i < $num; $i++){
                    $menu = $restaurant->getMenu($key);
                    array_push($orderCategories, $menu);
                }

            }
        }
        return $orderCategories;
    }

    public function order(Restaurant $restaurant ): Invoice{
        $this->printWantedToEat();
        $orderCategories = $this->interestedCategories($restaurant);
        $restaurant->printOrder($this->getName(), $orderCategories);
        $invoice = $restaurant->order($orderCategories);

        return $invoice;
    }

    public function printWantedToEat(): void{
        $print = "{$this->getName()} wanted to eat ";
        foreach($this->interestedTastesMap as $key=>$num){
            $print .= " {$key}";
        }
        $print .= "\n";
        echo $print;
    }
}