<?php

class DVD extends Product
{
    private $size;

    /**
     * @param $size
     */

    public function __construct($sku, $name, $price, $productType, $size)
    {
        parent::__construct($sku, $name, $price, $productType);
        $this->size = $size;
    }

    /**
     * @return mixed
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * @param mixed $size
     */
    public function setSize($size)
    {
        $this->size = $size;
    }

    public function createProduct($connection)
    {
        $sku = $this->getSku();
        $name = $this->getName();
        $price = $this->getPrice();
        $productType = $this->getProductType();
        $size = $this->getSize();
        $query = "INSERT INTO dvd (sku, name, price, productType, size)VALUES('$sku', '$name', '$price', '$productType', '$size')";
        if (mysqli_query($connection, $query)) {
            return print_r(json_encode(array("success" => true, "Info" => "Data has been inserted")));
        } else {
            return print_r(json_encode(array("success" => false, "Info" => "Data has been not inserted")));
        }
    }

    public function deleteProduct($connection)
    {
        $sku = $this->getSku();
        $query = "DELETE FROM dvd WHERE sku='$sku'";
        if (mysqli_query($connection, $query)) {
            return array("success" => true, "Info" => "Data has been delete");
        } else {
            return array("success" => false, "Info" => "Data has not been delete");
        }
    }
}