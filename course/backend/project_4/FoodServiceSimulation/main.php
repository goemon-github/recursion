<?php
spl_autoload_extensions(".php");
spl_autoload_register(function($class){
    $base_dir = __DIR__.'/src/';
    $file = $base_dir . str_replace('\\', '/', $class) . '.php';
    if(file_exists(($file))){
        require $file;
    }
});

$cheeseBuger =  new \FoodItems\CheeseBuger();
$fettuccine = new \FoodItems\Fettuccine();
$hawaianPizza = new \FoodItems\HawaiianPizza();
$spaghetti = new \FoodItems\Spaghetti();

$Inavah = new \Persons\Empoloyees\Chef("Inavah Lozano", 40, "Osaka", 1, 30);
$Nadia = new \Persons\Empoloyees\Cashier("Nadia Valentine", 21, "Tokyo", 1, 20);

$saizeriya = new \Restaurants\Restaurant(
    [
        $cheeseBuger,
        $fettuccine,
        $hawaianPizza,
        $spaghetti
    ],
    [
        $Inavah,
        $Nadia
    ]
);

$interestedTastesMap = [
    "Margherita" => 1,
    "CheeseBurger" => 2,
    "Spaghetti" => 1
];

$Tom = new \Persons\Customers\Customer("Tom", 20, "Saitama", $interestedTastesMap);
$invoice = $Tom->order($saizeriya);
$invoice->printInvoce();
