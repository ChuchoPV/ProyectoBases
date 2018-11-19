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
$CveAct = isset($_GET['CveM']) ? $_GET['CveM'] : die();
$nombre;
 
// read the details of product to be edited
// query to read single record
$query = "SELECT
            p.CveAct, p.nombrem
            FROM
            Actividad p
            WHERE
            p.CveAct = ?";                

// prepare query statement
$stmt = $db->prepare( $query );

// bind CveM of product to be updated
$stmt->bindParam(1, $CveAct);

// execute query
$stmt->execute();

// get retrieved row
$row = $stmt->fetch(PDO::FETCH_ASSOC);

extract($row);

// set values to object properties
$nombre = $row['nombrem'];
$CveAct = $row['CveAct'];

if($nombre!=null){
    // create array
    $alumno_arr = array(
        "CveM" =>  $CveAct,
        "nombre" => $nombre
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
    echo json_encode(array("message" => "Materia no existe."));
}
?>