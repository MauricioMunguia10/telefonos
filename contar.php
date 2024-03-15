<?php
    require('conexion.php');  
    $buscar= $cn->query("select * from  contar  WHERE clave =1");  
    if($buscar){ //o $buscar==1
        $datos=$buscar->fetch_array();
        $antiguo=$datos[1];
        $nuevo = $antiguo+1;
        $insertar=$cn->query("UPDATE contar SET numero = REPLACE (numero, $antiguo, $nuevo);"); 
        $nv = '[{"numero":'.$nuevo.'}]';
        echo($nv);

    }else{
        echo"no";
    }
?>