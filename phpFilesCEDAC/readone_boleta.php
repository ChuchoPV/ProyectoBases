<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once 'Database.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// set ID property of record to read
$CveAlu = isset($_GET['CveAlu']) ? $_GET['CveAlu'] : die();
$CveAct = isset($_GET['CveAct']) ? $_GET['CveAct'] : die();
$fecha = isset($_GET['fecha']) ? $_GET['fecha'] : die();
 
// read the details of product to be edited

      // query to read single record
      $query = "SELECT
                  *
              FROM
                  Boleta p
              WHERE
                  p.CveAlu = :CveAlu and p.CveAct = :CveAct and p.fechab = :fecha
              LIMIT
                  0,1";

      // prepare query statement
      $stmt = $db->prepare( $query );

      // bind CveAlu of product to be updated
      $stmt->bindParam(":CveAlu", $CveAlu);
      $stmt->bindParam(":CveAct", $CveAct);
      $stmt->bindParam(":fecha", $fecha);


      // execute query
      $stmt->execute();

     
 
if($stmt->execute()){
     // get retrieved row
      $row = $stmt->fetch(PDO::FETCH_ASSOC);

      extract($row);

      // set values to object properties
      $CveAct = $row['CveAct'];
      $CveAlu = $row['CveAlu'];
      $fecha = $row['fechab'];
      $comments = $row['comments'];
      $evaluacion = $row['evaluacion'];
    // create array
    $alumno_arr = array(
        "CveAlu" =>  $CveAlu,
        "CveAct" => $CveAct,
        "fecha" => $fecha,
        "comments" => $comments,
        "evaluacion" => $evaluacion
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($alumno_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user product does not exist
    echo json_encode(array("message" => "Product does not exist."));
}
?>