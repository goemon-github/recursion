<?php 
namespace FoodOrders;


class FoodOrder{
    protected array $items = [];
    protected string $orderTime;


    public function __construct(array $items)
    {
        $this->items = $items;
        #$this->orderTime = date("Y/m/d,  H:i");
        $this->orderTime = date("D M d, Y G:i");
    }

    public function getItems(): array{
        return $this->items;
    }

    public function setItem(string $item): void{
        array_push($this->items, $item);
    }

    public function getOrderTime(): string{
        return $this->orderTime;
    }
}