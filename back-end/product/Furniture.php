<?php

class Furniture extends Product
{
    private $height;
    private $width;
    private $length;

    public function getHeight()
    {
        return $this->height;
    }

    public function setHeight($height)
    {
        $this->height = $height;
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function setWidth($width)
    {
        $this->width = $width;
    }

    public function getLength()
    {
        return $this->length;
    }

    public function setLength($length)
    {
        $this->length = $length;
    }

    public function setAll($arr)
    {
        try {
            $this->setHeight($arr['height']);
            $this->setWidth($arr['width']);
            $this->setLength($arr['length']);
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
        $height = $this->getHeight();
        $width = $this->getWidth();
        $length = $this->getLength();
        $query = "INSERT INTO Furniture (sku, name, price, productType, height, width, length)VALUES('$sku', '$name', '$price', '$productType', '$height', '$width', '$length')";
        if (mysqli_query($connection, $query)) {
            return print_r(json_encode(array("success" => true, "Info" => "Data has been inserted")));
        }
    }
}