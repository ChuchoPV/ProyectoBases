<?php
class Database{
  //specific your own database credentials
  private $host = "localhost:3306";
  private $db_name = "CEDAC";
  private $username = "root";
  private $password = "glh+G45&ghr78";
  private $conn;

  //get the database conection
  public function getConnection(){
  
    $this->conn = null;

    try{
      $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
      $this->conn->exec("set names utf8");
    }catch(PDOException $exception){
      echo "Connection error: " . $exception->getMessage();
    }
    
    return $this->conn;
  }
}?>
