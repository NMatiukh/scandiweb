<?php

interface ProductInterface
{
    public function createProduct($connection);
    public function deleteProduct($sku);
}