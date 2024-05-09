<?php
namespace Restaurants;

use FoodItems\FoodItem;
use Persons\Empoloyees\Empoloyee;
use Invoices\Invoice;
use PDO;
use Persons\Empoloyees\Cashier;
use Persons\Empoloyees\Chef;

class Restaurant{
    private array $menus;
    private array $employee;

    public function __construct(array $menus, array $employee)
    {
        $this-> menus = $menus;
        $this-> employee = $employee;
    }

    public function getMenu(string $itemName): ?FoodItem{
        foreach($this->menus as $menu){
            if($menu->getName() === $itemName){
                return $menu;
            }
        }
        return null;
    }

    public function getMenus(): array{
        return $this->menus;
    }

    public function getEmployee(): array{
        return $this->employee;
    }


    public function hasManu(string $category): bool {
        foreach($this->menus as $menu){
            if($menu->getName() ===  $category){
                return true;
            }
        }
        return false;
    }

    public function printOrder(string $customerName, array $orderCategories){
        $print = "{$customerName} was Looking at the menu. and order";
        $countOrder = [];
        foreach($orderCategories as $menu){
            if(isset($countOrder[$menu->getName()])){
                $countOrder[$menu->getName()]++;
            }else{
                $countOrder[$menu->getName()] = 1;
            }
        }

        foreach($countOrder as $key => $num){
            $print .= " {$key} x {$num}";
        }
        $print .= ". \n";

        echo $print;
    }

    public function order(array $categories): Invoice{
       $cashier = $this->getCashier();
       $foodOrder = $cashier->generateOrder($categories, $this);

       $Chef = $this->getChef();
       echo $Chef-> prepareFood(($foodOrder));

       $invoice = $cashier->generateInvoice($foodOrder);

       return $invoice;

    }

    

    private function getCashier(): Cashier{
       foreach($this->employee as $empoloyee){
        if($empoloyee instanceof Cashier){
            return $empoloyee;
        }
       }
    }

    private function getChef(): Chef{
       foreach($this->employee as $empoloyee){
        if($empoloyee instanceof Chef){
            return $empoloyee;
        }
       }
    }

}