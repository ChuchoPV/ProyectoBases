<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once 'Database.php';
 
// instantiate database and product object
$database = new Database;
$db = $database->getConnection();
  
// select all query
$query = "SELECT CveAct FROM Actividad WHERE nombrem = :nombrem";

//prepare query statement
$stmt = $db->prepare($query);

$stmt->bindParam(":nombrem", $_GET['nombrem']);

// execute query
if($stmt->execute()){

    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    extract($row);

    $CveAct = $row['CveAct'];

    $alumno_arr = array(
        "CveAct" =>  $CveAct
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($alumno_arr);
 
}else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No claves found.")
    );
}
?>
