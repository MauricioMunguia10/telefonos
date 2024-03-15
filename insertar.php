<?php  
    $clave=$_POST['v1'];   
    $modelo=$_POST['v2'];  
    $precio=$_POST['v3'];   
    require('conexion.php');
    

    //Qué devuelve $cn->connect_errno, si la conexión es exitosa.
    //Devuelve 0 
    if(! $cn->connect_errno ) {
        //echo("Conexión exitosa");

        //insert into empleados values(1,'Alejandro');  Sintaxis guia
        $insertar=$cn->query("insert into modelos_moviles values('".$clave."','".$modelo."','".$precio."')"); 


        //Si la consulta se ejecuto correctamente $insertar vale 1     
         if($insertar==1){          
           //echo("El registro se guardo  correctamente=".!$cn->connect_errno. "Insertar =". $insertar); 
         }else{
           //echo("No se guardo el registro".$cn->error."insertar=".$insertar); //$insertar no devuielve ningun valor cuando falla la consulta
         }
        $cn->close();
    }else //2054 es el valor que devuelve $cn->connect_errno
         //Si la conexión falla 
      //echo("Fallo la Conexión".$cn->connect_errno); 
      //Error(500) interno del servidor, checar sintaxis en php
?>