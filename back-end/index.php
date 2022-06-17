<?php

include_once 'product/Book.php';
include_once 'product/DVD.php';
include_once 'product/Furniture.php';
include_once 'config/dbconfig.php';
include_once 'functions/functions.php';


$db = new DBClass();
$request_method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : '';
$data = json_decode(file_get_contents("php://input"), true);
$json = array();
$arr = [];

if ($request_method == "POST") {
    $action = $_REQUEST['action'];

    $connection = $db->getConnection();

    $products[] = new Book();
    $products[] = new Furniture();
    $products[] = new DVD();

    switch ($action) {
        case "createProduct":
            foreach ($products as $product) {
                if ($product instanceof Product) {
                    $product->setAll($data);
                    $product->createProduct($connection);
                }
            }
            return true;
        case "deleteProducts":
            foreach ($data as $product) {
                foreach ($products as $item) {
                    if ($item instanceof Product) {
                        $item->setAll($product);
                        $item->deleteProduct($connection);
                    }
                }
            }
            return true;
        default:
            $json = array("success" => false, "Info" => "Request method $request_method not available!", "action" => $action);
    }
    $connection = null;
}
if ($request_method == "GET") {
    $action = $_REQUEST['action'];
    $connection = $db->getConnection();
    switch ($action) {
        case "getProducts":
            $arr = getArrOfItem('Book', $connection, $arr);
            $arr = getArrOfItem('DVD', $connection, $arr);
            $arr = getArrOfItem("Furniture", $connection, $arr);
            usort($arr, function ($a, $b) {
                return strcmp($a->sku, $b->sku);
            });
            return print_r(json_encode($arr));
        default:
            $json = array("success" => false, "Info" => "Request method $request_method not available!");
    }
    $connection = null;
} else {
    print_r(json_encode($json));
}