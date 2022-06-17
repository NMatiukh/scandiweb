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

    public function createProduct($connection)
    {
        $sku = $this->getSku();
        $name = $this->getName();
        $price = $this->getPrice();
        $productType = $this->getProductType();
        $weight = $this->getWeight();
        $query = "INSERT INTO Book (sku, name, price, productType, weight)VALUES('$sku', '$name', '$price', '$productType', '$weight')";
        if (mysqli_query($connection, $query)) {
            return print_r(json_encode(array("success" => true, "Info" => "Data has been inserted")));
        }
    }

}