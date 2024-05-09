<?php
namespace Persons\Empoloyees;

use Persons\Person;

class Empoloyee extends Person{
    private int $employeeld;
    private float $salay;

    public function __construct(string $name, int $age, string $address, int $employeeld, float $salay)
    {
        parent::__construct($name, $age, $address);       
        $this -> employeeld = $employeeld;
        $this -> salay = $salay;
    }
}