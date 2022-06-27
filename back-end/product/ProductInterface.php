<?php

interface ProductInterface
{
    public function createProduct($connection, $values);
    public function deleteProduct($connection);
    public function getArrOfItem($connection, $arr);
}