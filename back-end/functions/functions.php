<?php

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