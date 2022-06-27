<?php
include_once 'product/Product.php';

class Book extends Product
{
    private $weight;

    public function getWeight()
    {
        return $this->weight;
    }

    public function setWeight($weight)
    {
        $this->weight = $weight;
    }

    public function setAll($arr)
    {
        try {
            $this->setWeight($arr['weight']);
            $this->setSku($arr['sku']);
            $this->setPrice($arr['price']);
            $this->setName($arr['name']);
            $this->setProductType($arr['productType']);
        } catch (Exception $exception) {
            echo $exception;
        }
    }
}