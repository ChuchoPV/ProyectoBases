<?php
class Alumno{
 
    // database connection and table nombre
    private $conn;
    private $table_name = "ALUMNO";
    private $table_materia = 'MATERIA';
    private $table_alumno_materia = 'ALUMNOMATERIA';
    private $boleta = 'BOLETA';
 
    // object properties
    public $CveAlu;
    public $nombre;
    public $fechanaci;
    public $tel;
    public $direccion;
    public $mail;
 
    // constructor with $db as database connection
    public function __construct($db){
      $this->conn = $db;
    }
    
    //read products
    function read(){
      // select all query
      $query = "SELECT
		              p.CveAlu, p.nombre, p.fechanaci, p.tel, p.direccion, p.mail
		            FROM
                  " . $this->table_name . " p";

      //prepare query statement
      $stmt = $this->conn->prepare($query);

      // execute query
      $stmt->execute();

      return $stmt;
    }

    function boleta(){
        //query
        $query = "SELECT a.nombre, nombrem, b.calificacion, b.fechab 
                FROM ' . $this->boleta . ' b, ' . $this->table_name . ' a, ' . $this->table_materia . '
                WHERE a.CveAlu = :CveAlu 
                ORDER BY fechab";

        // Prepare statement 
        $stmt = $this->conn->prepare($query);

        $this->CveAlu=htmlspecialchars(strip_tags($this->CveAlu));
        $stmt->bindValue(":CveAlu", $this->CveAlu);

        // execute the query
        $stmt->execute();

        return $stmt;
    }

     // create product
    function create(){
    
      // query to insert record
      $query = "INSERT INTO
                  " . $this->table_name . "
                SET
                  nombre=:nombre, CveAlu=:CveAlu, fechanaci=:fechanaci, tel=:tel, direccion=:direccion, mail=:mail";

      // prepare query
      $stmt = $this->conn->prepare($query);

      // sanitize
      $this->nombre=htmlspecialchars(strip_tags($this->nombre));
      $this->CveAlu=htmlspecialchars(strip_tags($this->CveAlu));
      $this->fechanaci=htmlspecialchars(strip_tags($this->fechanaci));
      $this->tel=htmlspecialchars(strip_tags($this->tel));
      $this->direccion=htmlspecialchars(strip_tags($this->direccion));
      $this->mail=htmlspecialchars(strip_tags($this->mail));

      // bind values
      $stmt->bindParam(":nombre", $this->nombre);
      $stmt->bindParam(":CveAlu", $this->CveAlu);
      $stmt->bindParam(":fechanaci", $this->fechanaci);
      $stmt->bindParam(":tel", $this->tel);
      $stmt->bindParam(":direccion", $this->direccion);
      $stmt->bindParam(":mail", $this->mail);

      // execute query
      if($stmt->execute()){
          return true;
      }
      return false;
      
    }

    // used when filling up the update product form
    function readOne(){
    
      // query to read single record
      $query = "SELECT
                  p.CveAlu, p.nombre, p.fechanaci, p.tel, p.direccion, p.mail
              FROM
                  " . $this->table_name . " p
              WHERE
                  p.CveAlu = ?
              LIMIT
                  0,1";

      // prepare query statement
      $stmt = $this->conn->prepare( $query );

      // bind CveAlu of product to be updated
      $stmt->bindParam(1, $this->CveAlu);

      // execute query
      $stmt->execute();

      // get retrieved row
      $row = $stmt->fetch(PDO::FETCH_ASSOC);

      // set values to object properties
      $this->nombre = $row['nombre'];
      $this->CveAlu = $row['CveAlu'];
      $this->fechanaci = $row['fechanaci'];
      $this->tel = $row['tel'];
      $this->direccion = $row['direccion'];
      $this->mail = $row['mail'];

    }

    // update the product
    function update(){
    
      // update query
      $query = "UPDATE
                  ' . $this->table_name . '
                SET
                  nombre = :nombre,
                  fechanaci = :fechanaci,
                  direccion = :direccion,
                  tel = :tel,
                  mail = :mail
                 WHERE
                  CveAlu = :CveAlu";

      // prepare query statement
      $stmt = $this->conn->prepare($query); 

      // sanitize
      $this->nombre=htmlspecialchars(strip_tags($this->nombre));
      $this->CveAlu=htmlspecialchars(strip_tags($this->CveAlu));
      $this->fechanaci=htmlspecialchars(strip_tags($this->fechanaci));
      $this->tel=htmlspecialchars(strip_tags($this->tel));
      $this->direccion=htmlspecialchars(strip_tags($this->direccion));
      $this->mail=htmlspecialchars(strip_tags($this->mail));

      // bind values
      $stmt->bindParam(":nombre", $this->nombre);
      $stmt->bindParam(":CveAlu", $this->CveAlu);
      $stmt->bindParam(":fechanaci", $this->fechanaci);
      $stmt->bindParam(":tel", $this->tel);
      $stmt->bindParam(":direccion", $this->direccion);
      $stmt->bindParam(":mail", $this->mail);

      // execute the query
      if($stmt->execute()){
          return true;
      }

      return false;
    }

    // delete the product
    function delete(){
    
      // delete query
      $query = "DELETE FROM " . $this->table_name . " WHERE CveAlu = ?";

      // prepare query
      $stmt = $this->conn->prepare($query);

      // sanitize
      $this->CveAlu=htmlspecialchars(strip_tags($this->CveAlu));

      // bind CveAlu of record to delete
      $stmt->bindParam(1, $this->CveAlu);

      // execute query
      if($stmt->execute()){
          return true;
      }

      return false;
      
    }

    // search products
    function search($keywords){
    
      // select all query
      $query = "SELECT
                  p.CveAlu, p.nombre, p.fechanaci, p.tel, p.direccion, p.mail
                FROM
                    " . $this->table_name . " p
                WHERE
                    p.nombre LIKE ? or p.CveAlu LIKE ? or c.fechanaci LIKE ?";

      // prepare query statement
      $stmt = $this->conn->prepare($query);

      // sanitize
      $keywords=htmlspecialchars(strip_tags($keywords));
      $keywords = "%{$keywords}%";

      // bind
      $stmt->bindParam(1, $keywords);
      $stmt->bindParam(2, $keywords);
      $stmt->bindParam(3, $keywords);

      // execute query
      $stmt->execute();

      return $stmt;
    }
}
?>