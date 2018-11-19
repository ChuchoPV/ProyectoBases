<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once 'Database.php';
include_once 'Alumno.php';
 
// instantiate database and product object
$database = new Database;
$db = $database->getConnection();
 
// initialize object
$alumno = new Alumno($db);
 
// query products
$stmt = $alumno->read();
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
            "CveA" => $CveA,
            "nombre" => $nombre,
            "fechanaci" => $fechanaci,
            "tel" => $tel,
            "direccion" => $direccion,
            "mail" => $mail

        );
 
        array_push($alumnos_arr["records"], $alumno_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
    echo json_encode($alumnos_arr);
}
 
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No products found.")
    );
}
?>
