<?php

class Furniture extends Product
{
    private $height;
    private $width;
    private $length;

    /**
     * @param $height
     * @param $width
     * @param $length
     */
    public function __construct($sku, $name, $price, $productType, $height, $width, $length)
    {
        parent::__construct($sku, $name, $price, $productType);
        $this->height = $height;
        $this->width = $width;
        $this->length = $length;
    }

    /**
     * @return mixed
     */
    public function getHeight()
    {
        return $this->height;
    }

    /**
     * @param mixed $height
     */
    public function setHeight($height)
    {
        $this->height = $height;
    }

    /**
     * @return mixed
     */
    public function getWidth()
    {
        return $this->width;
    }

    /**
     * @param mixed $width
     */
    public function setWidth($width)
    {
        $this->width = $width;
    }

    /**
     * @return mixed
     */
    public function getLength()
    {
        return $this->length;
    }

    /**
     * @param mixed $length
     */
    public function setLength($length)
    {
        $this->length = $length;
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
        $query = "INSERT INTO furniture (sku, name, price, productType, height, width, length)VALUES('$sku', '$name', '$price', '$productType', '$height', '$width', '$length')";
        if (mysqli_query($connection, $query)) {
            return print_r(json_encode(array("success" => true, "Info" => "Data has been inserted")));
        } else {
            return print_r(json_encode(array("success" => false, "Info" => "Data has been not inserted")));
        }
    }

    public function deleteProduct($connection)
    {
        $sku = $this->getSku();
        $query = "DELETE FROM furniture WHERE sku='$sku'";
        if (mysqli_query($connection, $query)) {
            return array("success" => true, "Info" => "Data has been delete");
        } else {
            return array("success" => false, "Info" => "Data has not been delete");
        }
    }
}