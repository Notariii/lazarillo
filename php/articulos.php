<?php 

$servidor = "localhost";
$usuario = "root";
$clave = "";
$baseDeDatos = "lazarillo";

$enlace = mysqli_connect($servidor, $usuario, $clave, $baseDeDatos);


if(isset($_POST['enviar'])){
    $id = $_POST ['id'];
    $compe = $_POST ['compe'];
    $objetivo = $_POST ['%objetivo'];

    $insertarDatos = "INSERT INTO articulos VALUES('$id', '$compe', '$objetivo')";
    $ejecutarInsertar = mysqli_query ($enlace, $insertarDatos);
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmacion</title>
</head>
<body>
    <section> Datos guardados exitosamente</section>
    <a href="../datos.html">Volver</a>
    <style>
        section{
            position: absolute;
            background: black;
            width: auto;
            height: auto;
            top: 0;
            inset: 0;
            display: grid;
            font-size: 48px;
            place-content: center;
            color:white;
            grid-auto-flow: row;


        }

        a{
            position: relative;
            background: black;
            width: auto;
            height: auto;
            display: grid;
            font-size: 30px;
            place-content: center;
            color:white;
            text-decoration: none;

        }

    </style>
</body>
</html>