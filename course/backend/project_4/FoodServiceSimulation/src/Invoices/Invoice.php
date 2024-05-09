<?php
namespace Invoices;

class Invoice{
    protected float $finalPrice;
    protected string $orderTime;

    public function __construct(float $finalPrice, string $orderTime )
    {
        $this-> finalPrice = $finalPrice;        
        #$this-> orderTime =  date("Y/m/d,  H:i");
        #$this->orderTime = date("D M d, Y G:i");
        $this->orderTime = $orderTime;
    }

    public function printInvoce(): void{
        print("--------------------------------------" . "\n");
        print("Date: " . $this->orderTime . "\n");
        print("Final Price: $" . number_format($this->finalPrice, 1) . "\n");
        print("--------------------------------------" . "\n");
    }


}