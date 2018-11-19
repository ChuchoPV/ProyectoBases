<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object file
include_once 'Database.php';

// get database connection
$database = new Database();
$db = $database->getConnection();
 
// get alumno CveM
$data = json_decode(file_get_contents("php://input"));

$CveM = isset($_GET['CveM']) ? $_GET['CveM'] : die();
 
// delete query
$query = "DELETE FROM Actividad WHERE CveAct = ?";

// prepare query
$stmt = $db->prepare($query);

// sanitize
$CveM=htmlspecialchars(strip_tags($CveM));

// bind CveM of record to delete
$stmt->bindParam(1, $CveM);

// delete the alumno
if($stmt->execute()){
 
    // set response code - 200 ok
    http_response_code(200);
  
    // tell the user
    echo json_encode(array("message" => "Materia was deleted."));
}
 
// if unable to delete the alumno
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to delete materia."));
}
?>