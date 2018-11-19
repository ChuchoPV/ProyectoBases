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

$sql = "UPDATE Actividad SET nombrem=:nombrem
                    WHERE CveAct=:CveM";

// Prepare statement
$stmt = $db->prepare($sql);

$stmt->bindParam(":CveM", $_GET['CveM']);
$stmt->bindParam(":nombrem", $_GET['nombrem']);

// execute the query
$stmt->execute();

// echo a message to say the UPDATE succeeded
echo $stmt->rowCount() . " records UPDATED successfully";

?>