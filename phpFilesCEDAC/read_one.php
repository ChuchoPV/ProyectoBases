<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once 'Database.php';
include_once 'Alumno.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$alumno = new Alumno($db);
 
// set ID property of record to read
$alumno->CveA = isset($_GET['CveA']) ? $_GET['CveA'] : die();
 
// read the details of product to be edited
$alumno->readOne();
 
if($alumno->nombre!=null){
    // create array
    $alumno_arr = array(
        "CveA" =>  $alumno->CveA,
        "nombre" => $alumno->nombre,
        "fechanaci" => $alumno->fechanaci,
        "tel" => $alumno->tel,
        "direccion" => $alumno->direccion,
        "mail" => $alumno->mail
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