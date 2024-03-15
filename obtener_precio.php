<?php  
    $conexion = new mysqli("localhost", "root", "12345678", "modelos");  
    $clave1 = 1;
    $buscar= $conexion->query("select * from  modelos_moviles  WHERE clave =". $clave1);  
    if($buscar){ //o $buscar==1
        $precio=$buscar->fetch_array();
        $valor = '[{"precio":'.$precio[2].'}]';
        echo($valor);
    }    
?>