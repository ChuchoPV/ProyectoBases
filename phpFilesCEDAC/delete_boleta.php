<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object file
include_once 'Database.php';
include_once 'Alumno.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
  
// get alumno CveA
$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->CveAct) &&
    !empty($data->CveAlu) &&
    !empty($data->fecha)

){
    // set alumno CveA to be deleted
    $CveAlu = $data->CveAlu;
    $CveAct = $data->CveAct;
    $fechab = $data->fecha;

    // delete query
    $query = "DELETE FROM Boleta WHERE CveAlu = :CveAlu and CveAct = :CveAct and fechab = :fechab";

    // prepare query
    $stmt = $db->prepare($query);

    // bind CveAlu of record to delete
    $stmt->bindParam(":CveAlu", $CveAlu);
    $stmt->bindParam(":CveAct", $CveAct);
    $stmt->bindParam(":fechab", $fechab);

    //execute query
    if($stmt->execute()){
    
        // set response code - 200 ok
        http_response_code(200);
    
        // tell the user
        echo json_encode(array("message" => "alumno was deleted."));
    }
    
    // if unable to delete the alumno
    else{
    
        // set response code - 503 service unavailable
        http_response_code(503);
    
        // tell the user
        echo json_encode(array("message" => "Unable to delete alumno."));
    }
}else{
    http_response_code(404);
    
    // tell the user
    echo json_encode(array("message" => "Unable to delete alumno. Data incomplete"));
}
?>