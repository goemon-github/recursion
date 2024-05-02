<?php
namespace Invoices;

class Invoice{
    protected float $finalPrice;
    protected string $orderTime;
    protected int $estimatedTimeInMinutes;

    public function __construct(float $finalPrice, string $orderTime, int $estimatedTimeInMinutes)
    {
        $this-> finalPrice = $finalPrice;        
        $this-> orderTime = $orderTime;
        $this-> estimatedTimeInMinutes = $estimatedTimeInMinutes;
    }

    public function printInvoce(): void{
        print("--------------------------------------" . "\n");
        print("Date: " . $this->orderTime . "\n");
        print("Final Price: $" . (string)$this->finalPrice . "\n");
        print("--------------------------------------" . "\n");
    }
}