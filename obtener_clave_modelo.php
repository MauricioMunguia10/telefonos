<?php
     
     $conexion = new mysqli("localhost", "root", "12345678", "modelos");
     $consulta = $conexion->query("SELECT * FROM modelos_moviles");
    if($consulta==1){
       //La variable $cadena(acumulador) es el arreglo clave valor  
       $cadena="[{";//o  usar '[{' 
       $c=0;  
       while($datos = $consulta->fetch_array()){
         $c++; 
         $clave= 'clave'.$c;
         $modelo='modelo'.$c;
         $precio='precio'.$c;
         //$cadena.='"clave":'.$datos[0].',"modelo":"'.$datos[1].'",';
         $cadena.='"'.$clave.'":'.$datos[0].',"'.$modelo.'":"'.$datos[1].'","'.$precio.'":"'.$datos[2].'",';
       }
      //Nuevo
      $cadena.='"tam":'.$c.',"col":3,';
      $largo=strlen($cadena);
      $cadena2=substr($cadena,0,($largo-1));
      $cadena2.="}]";
      $conexion->close(); 
      echo $cadena2;
    }
    
?>