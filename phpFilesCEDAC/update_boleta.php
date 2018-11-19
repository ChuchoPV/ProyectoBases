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

$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->CveAct) &&
    !empty($data->CveAlu) &&
    !empty($data->fecha) &&
    !empty($data->comments) &&
    !empty($data->evaluacion)

){
 
    // set product property values
    $CveAct = $data->CveAct;
    $CveAlu = $data->CveAlu;
    $fechab = $data->fecha;
    $comments = $data->comments;
    $evaluacion = $data->evaluacion;

    // query to insert record
    $query = "UPDATE Boleta SET evaluacion = :evaluacion, comments = :comments
                WHERE CveAlu=:CveAlu and CveAct=:CveAct and  fechab = :fechab"; 

    // prepare query
    $stmt = $db->prepare($query);

    // bind values
    $stmt->bindParam(":CveAlu", $CveAlu);
    $stmt->bindParam(":CveAct", $CveAct);
    $stmt->bindParam(":fechab", $fechab);
    $stmt->bindParam(":evaluacion", $evaluacion);
    $stmt->bindParam(":comments", $comments);

    $stmt->execute();
    //execute query
    if($stmt->execute()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Product was updated."));
    }
 
    // if unable to create the product, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to update product."));
        //echo json_encode(array($data));
    }
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update product. Data is incomplete."));
}
?>