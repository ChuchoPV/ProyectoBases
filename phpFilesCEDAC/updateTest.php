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

$alumno = new Alumno($db);

$data = json_decode(file_get_contents("php://input"));

$sql = "UPDATE Alumno SET nombre=:nombre, fechanaci = :fechanaci, tel= :tel,
                            direccion = :direccion, mail=:mail
                    WHERE CveAlu=:CveA";

// Prepare statement
$stmt = $db->prepare($sql);

$stmt->bindParam(":CveA", $_GET['CveA']);
$stmt->bindParam(":nombre", $_GET['nombre']);
$stmt->bindParam(":fechanaci", $_GET['fechanaci']);
$stmt->bindParam(":tel", $_GET['tel']);
$stmt->bindParam(":direccion", $_GET['direccion']);
$stmt->bindParam(":mail", $_GET['mail']);

// execute the query
$stmt->execute();

// echo a message to say the UPDATE succeeded
echo $stmt->rowCount() . " records UPDATED successfully";

?>