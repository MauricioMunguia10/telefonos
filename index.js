//Variables globales
let dato;
let lista_modelos; 
let caja_precio;
let clave, modelo, precio;
let count=0;
let contador;

//identifica el navegador
addEvent(window,'load',cargar, false);
function addEvent(ele,eve,fun,cap){
    if(window.attachEvent)
        addAttachEvent('on'+eve,fun);
    else
        ele.addEventListener(eve,fun,cap);
}

//funcion principal
function cargar(){      
lista_modelos= document.getElementById("tbl_modelos");
contador = document.getElementById("visitas");
//caja_precio= document.getElementById("txt_precio");
//addEvent(lista_modelos,'change',conexionServidor2,false);
addEvent(document.getElementById("btn_insertar"),'click',insertarNuevo,false);
//conexionServidor1();    
contadorVisitas();
}
//contador de visitas
function contadorVisitas(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = respuestaVisitas;
    conexion.open("POST","contar.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    conexion.send();
}
function respuestaVisitas(){
    if(conexion.readyState == 4){
        //alert(conexion.responseText);
        arr = eval('('+conexion.responseText+')');
        conexionServidor1();
        let fragment=document.createDocumentFragment(); 
        let texto=document.createElement('p');
        texto.textContent="Visitas: "+arr[0]["numero"]+" ";
        fragment.appendChild(texto);
        contador.appendChild(fragment);
    }
    
}
//funcion que inserta en la base de datos
function insertarNuevo(){
    modelo = document.getElementById("txt_modelo").value;
    clave = document.getElementById("txt_clave").value;
    precio=10;
    conexion=xmlhttprequest();
    conexion.onreadystatechange=esperaResultado;
    conexion.open("POST","insertar.php",true); 
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send("v1="+clave+"&v2="+modelo+"&v3="+precio);
}
function esperaResultado(){
    count++;
    if(conexion.readyState==4){
        //alert(conexion.responseText);
        destruir();
        conexionServidor1();  
        count=0;
    }
}
//funcion que destruye la tabla para que no se repita
function destruir(){
    document.getElementById("tbl_modelos").innerHTML = '<table border="1" id="tbl_modelos"> </table>';
}
function conexionServidor2(){
    alert("cs2");
    //caja_precio.value =lista_modelos.value;
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaRespuesta2;
    conexion.open("POST","obtener_precio.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    conexion.send("clave="+lista_modelos.value);
}
function esperaRespuesta2(){
    if(conexion.readyState == 4){
        //alert(conexion.responseText);
        dato = eval(conexion.responseText);
        caja_precio.value=dato[0]["precio"];
                
    } 
}

//funcion que busca todos los modelos en la bd
function conexionServidor1(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaRespuesta1;
    conexion.open("POST","obtener_clave_modelo.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    conexion.send();
    
}
function esperaRespuesta1(){ 
    if(conexion.readyState == 4){
        //alert(conexion.responseText);
        //dato = eval('('+conexion.responseText+')');
        //A dato se le asigna el arreglo clave-valor
        dato = eval(conexion.responseText);
        
        agregarOpciones();
            
    }
}  

   
function agregarOpciones(){
    //lista_modelos
    //alert("agregar");
    //1.- Creamos un fragment y lo guardamos en una variable 
    let fragment1=document.createDocumentFragment();
    let fragment2=document.createDocumentFragment();
    //Se puede usar también un for-in
    //Crea las filas
    for(let i=1;i<=dato[0]["tam"];i++){
        //2.- Creamos una etiqueta que se relaciona con la principal y la guardamos en una variable(opcion1). 
        let fila=document.createElement('tr');
        //3.- A la etiqueta le asignamos atributos 
        fila.setAttribute('id',"fila"+i);
        fila.textContent="" ;
        //4.-A la variable del paso 1 (fragment1) le adjuntamos o concatenamos opcion1
        fragment1.appendChild(fila);
        
    }
    lista_modelos.appendChild(fragment1);
    //Crea las columnas
    for(let i=1;i<=dato[0]["tam"];i++){
        fila= document.getElementById("fila"+i);
        let columna1=document.createElement('td');
        let columna2=document.createElement('td');
        columna1.textContent=dato[0]["clave"+i]+"  ";
        columna2.textContent=dato[0]["modelo"+i]+" ";
        fragment2.appendChild(columna1);
        fragment2.appendChild(columna2);
        fila.appendChild(fragment2);
    }

}
function xmlhttprequest(){
    return new XMLHttpRequest();
}
//MMG
