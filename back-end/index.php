<?php

include_once 'product/Book.php';
include_once 'product/DVD.php';
include_once 'product/Furniture.php';
include_once 'config/dbconfig.php';


$products = new ArrayObject();
$db = new DBClass();
$request_method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : '';
$data = json_decode(file_get_contents("php://input"), true);
$json = array();
$table = array("dvd", "books", "furniture");
$arr = [];

function getArrOfItem($productTable, $connection, $arr)
{
    $query = "SELECT * FROM $productTable";
    $result = mysqli_query($connection, $query);
    if ($result) {

        while ($obj = mysqli_fetch_object($result)) {
            array_push($arr, $obj);
        }
        return $arr;
    }
}

if ($request_method == "POST") {
    $action = $_REQUEST['action'];

    $connection = $db->getConnection();

    $arr = getArrOfItem('books', $connection, $arr);
    $arr = getArrOfItem('dvd', $connection, $arr);
    $arr = getArrOfItem("furniture", $connection, $arr);
    usort($arr, function ($a, $b) {
        return strcmp($a->sku, $b->sku);
    });

    switch ($action) {
        case "createProduct":

            while ($data['productType'] == 'Book') {
                $book = new Book($data['sku'], $data['name'], $data['price'], $data['productType'], $data['weight']);
                $book->createProduct($connection);
                break;
            }
            while ($data['productType'] == 'DVD') {
                $dvd = new DVD($data['sku'], $data['name'], $data['price'], $data['productType'], $data['size']);
                $dvd->createProduct($connection);
                break;
            }
            while ($data['productType'] == 'Furniture') {
                $furniture = new Furniture($data['sku'], $data['name'], $data['price'], $data['productType'], $data['height'], $data['width'], $data['length']);
                $furniture->createProduct($connection);
                break;
            }
            return $json = array("success" => false, "Info" => "Request method $request_method not available!");
        case "deleteProducts":
            foreach ($data as $product) {
                while ($product['productType'] == 'Book') {
                    $book = new Book($product['sku'], $product['name'], $product['price'], $product['productType'], $product['weight']);
                    $book->deleteProduct($connection);
                    echo "del";

                    break;
                }
                while ($product['productType'] == 'DVD') {
                    $dvd = new DVD($product['sku'], $product['name'], $product['price'], $product['productType'], $product['size']);
                    $dvd->deleteProduct($connection);
                    break;
                }
                while ($product['productType'] == 'Furniture') {
                    $furniture = new Furniture($product['sku'], $product['name'], $product['price'], $product['productType'], $product['height'], $product['width'], $product['length']);
                    $furniture->deleteProduct($connection);
                    break;
                }
            }
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

            $arr = getArrOfItem('books', $connection, $arr);
            $arr = getArrOfItem('dvd', $connection, $arr);
            $arr = getArrOfItem("furniture", $connection, $arr);
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