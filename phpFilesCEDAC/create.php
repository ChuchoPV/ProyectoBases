<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once 'Database.php';
 
// instantiate product object
include_once 'Alumno.php';
 
$database = new Database();
$db = $database->getConnection();
 
$alumno = new Alumno($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(
    !empty($data->CveA) &&
    !empty($data->nombre) &&
    !empty($data->fechanaci) &&
    !empty($data->tel) &&
    !empty($data->direccion) &&
    !empty($data->mail)
){
 
    // set product property values
    $alumno->nombre = $data->nombre;
    $alumno->CveA = $data->CveA;
    $alumno->fechanaci = $data->fechanaci;
    $alumno->tel = $data->tel;
    $alumno->direccion = $data->direccion;
    $alumno->mail = $data->mail;
 
    // create the product
    if($alumno->create()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Product was created."));
    }
 
    // if unable to create the product, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create product."));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
}
?>