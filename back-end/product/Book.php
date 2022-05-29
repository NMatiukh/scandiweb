<?php
include_once 'product/Product.php';

class Book extends Product
{
    private $weight;

    /**
     * @param $weight
     */

    public function __construct($sku, $name, $price, $productType, $weight)
    {
        parent::__construct($sku, $name, $price, $productType);
        $this->weight = $weight;
    }

    /**
     * @return mixed
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * @param mixed $weight
     */
    public function setWeight($weight)
    {
        $this->weight = $weight;
    }

    public function createProduct($connection)
    {
        $sku = $this->getSku();
        $name = $this->getName();
        $price = $this->getPrice();
        $productType = $this->getProductType();
        $weight = $this->getWeight();
        $query = "INSERT INTO books (sku, name, price, productType, weight)VALUES('$sku', '$name', '$price', '$productType', '$weight')";
        if (mysqli_query($connection, $query)) {
            return print_r(json_encode(array("success" => true, "Info" => "Data has been inserted")));
        } else {
            return print_r(json_encode(array("success" => false, "Info" => "Data has been not inserted")));
        }
    }

    public function deleteProduct($connection)
    {
        $sku = $this->getSku();
        $query = "DELETE FROM books WHERE sku='$sku'";
        if (mysqli_query($connection, $query)) {
            return array("success" => true, "Info" => "Data has been delete");
        } else {
            return array("success" => false, "Info" => "Data has not been delete");
        }
    }
}