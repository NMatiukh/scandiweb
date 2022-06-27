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
}