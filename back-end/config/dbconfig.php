<?php
class DBClass {



    private $host = "localhost";
    private $username = "id18848743_nmatiukh";
    private $password = "_a=!#Dzm6Dk0D24o";
    private $database = "id18848743_products";

    public $connection;

    // get the database connection
    public function getConnection(){
        $this->connection = null;

        try{
            $this->connection = mysqli_connect($this->host, $this->username, $this->password, $this->database);
        }catch(Exception $exception){
            echo "Error: " . $exception->getMessage();
        }

        return $this->connection;
    }
}