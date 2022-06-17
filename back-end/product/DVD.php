<?php

class DVD extends Product
{
    private $size;

    public function getSize()
    {
        return $this->size;
    }

    public function setSize($size)
    {
        $this->size = $size;
    }

    public function setAll($arr)
    {
        try {
            $this->setSize($arr['size']);
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
        $size = $this->getSize();
        $query = "INSERT INTO DVD (sku, name, price, productType, size)VALUES('$sku', '$name', '$price', '$productType', '$size')";
        if (mysqli_query($connection, $query)) {
            return print_r(json_encode(array("success" => true, "Info" => "Data has been inserted")));
        }
    }
}