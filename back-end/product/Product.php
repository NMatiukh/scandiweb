<?php
include_once 'product/ProductInterface.php';

abstract class Product implements ProductInterface
{
    private $sku;
    private $name;
    private $price;
    private $productType;

    public function __construct($productType)
    {
        $this->productType = $productType;
    }


    public function getSku()
    {
        return $this->sku;
    }

    public function setSku($sku)
    {
        $this->sku = $sku;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function getProductType()
    {
        return $this->productType;
    }

    public function setProductType($productType)
    {
        $this->productType = $productType;
    }

    public function deleteProduct($connection)
    {
        $sku = $this->getSku();
        $productType = $this->getProductType();
        $query = "DELETE FROM $productType WHERE sku='$sku'";
        if (mysqli_query($connection, $query)) {
            return print_r(json_encode(array("success" => true, "Info" => "Data has been delete")));
        }
    }

    public function getArrOfItem($connection, $arr)
    {
        $productType = $this->getProductType();
        $query = "SELECT * FROM $productType";
        $result = mysqli_query($connection, $query);
        if ($result) {
            while ($obj = mysqli_fetch_object($result)) {
                array_push($arr, $obj);
            }
            return $arr;
        }
    }

    public function createProduct($connection, $values)
    {
        $keysStr = implode(", ", array_keys($values));
        $str = implode("', '", $values);
        $productType = $this->getProductType();
        $query = "INSERT INTO $productType ($keysStr)VALUES('$str')";
        if (mysqli_query($connection, $query)) {
            return print_r(json_encode(array("success" => true, "Info" => "Data has been inserted")));
        }
    }
}