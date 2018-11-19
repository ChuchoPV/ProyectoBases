<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object file
include_once 'Database.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));


//query
$query = "SELECT a.nombrem, b.evaluacion, b.fechab, b.comments from Actividad a, Boleta b 
        where b.CveAct = a.CveAct and b.CveAlu = ? order by b.fechab";

// Prepare statement 
$stmt = $db->prepare($query);

$stmt->bindValue(1, $_GET['CveA']);

// execute the query
$stmt->execute();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $alumnos_arr=array();
    $alumnos_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $alumno_item=array(
            "nombrem" => $nombrem,
            "calificacion" => $evaluacion,
            "fecha" => $fechab,
            "comments" => $comments

        );
 
        array_push($alumnos_arr["records"], $alumno_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
    echo json_encode($alumnos_arr);
}else{
 
    // set response code - 404 Not found
    http_response_code(404);
 

    // tell the user no products found
    echo json_encode(
        array("message" => "No products found.")
    );
}
?>
