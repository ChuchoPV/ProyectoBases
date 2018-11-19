<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once 'Database.php';
include_once 'Alumno.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare alumno object
$alumno = new Alumno($db);
 
// get CveA of alumno to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set CveA property of alumno to be edited
$alumno->CveA = $data->CveA;
 
// set alumno property values
$alumno->nombre = $data->nombre;
$alumno->fechanaci = $data->fechanaci;
$alumno->tel = $data->tel;
$alumno->direccion = $data->direccion;
$alumno->mail = $data->mail;
 
// update the alumno
if($alumno->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "Alumno was updated."));
}
 
// if unable to update the alumno, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update alumno."));
}
?>