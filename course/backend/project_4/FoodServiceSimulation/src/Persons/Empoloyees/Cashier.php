<?php
namespace Persons\Empoloyees;

use FoodOrders\FoodOrder;
use Invoices\Invoice;
use Persons\Empoloyees\Empoloyee;
use Restaurants\Restaurant;

class Cashier extends Empoloyee{
    public function __construct(string $name, int $age, string $address, int $employeeld, float $salay)
    {
       parent::__construct($name, $age, $address, $employeeld, $salay) ;
    }

    public function generateOrder(array $categories, Restaurant $restaurant): FoodOrder{
        $foodOrder = new FoodOrder($categories);
        echo "{$this->getName()} received ther order. \n";
        return $foodOrder;
    }

    public function getFinalPrice(FoodOrder $foodOrder): float{
        $finalPrice = 0.0;
        foreach($foodOrder->getItems() as $item){
            $finalPrice += $item->getPrice();
        }

        return $finalPrice;
    }
    
    public function generateInvoice(FoodOrder $foodorder): Invoice{
        $finalPrice = $this->getFinalPrice($foodorder);
        $invoice = new Invoice($finalPrice, $foodorder->getOrderTime());
        
        echo "{$this->getName()} make the invoice. \n";

        return $invoice;
    }
}