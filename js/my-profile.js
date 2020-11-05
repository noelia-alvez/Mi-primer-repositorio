function guardarPerfil() {

var nameOne = document.getElementById("primerNombre").value;
var nameTwo = document.getElementById("segundoNombre").value;
var surnameOne = document.getElementById("primerApellido").value;
var surnameTwo = document.getElementById("segundoApellido").value;
var age = document.getElementById("edad").value;
var phone = document.getElementById("tel").value;

sessionStorage.setItem("perfilUsuario",
    JSON.stringify(
    {
    nombre: nameOne,
    nombreDos: nameTwo,
    apellido: surnameOne,
    apellidoDos: surnameTwo,
    edad: age,
    correo: localStorage.getItem("email"),
    tel: phone,
    }
    ));

imprimirResultados();
}


document.addEventListener("DOMContentLoaded", function(e){
    
    var correoUsuario = localStorage.getItem("email");
    document.getElementById("modEmail").value = correoUsuario;


//imprimirResultados();

});

function imprimirResultados() {

    let htmlContentToAppend = "";

    var infoUsuario = JSON.parse(sessionStorage.getItem("perfilUsuario"));

        htmlContentToAppend += `
        <div class="container">
        <div class="row">

            <div class="col">
                <label for="primerNombre">
                <strong>Primer nombre: </strong><input style="width: 400px;" class="form-control" type="text" id="primerNombre"  placeholder="Ingrese su nombre" value="` + infoUsuario.nombre + `" />
                </label>  
            <div class="invalid-feedback">
                  Debe ingresar su nombre
            </div> 
            </div>
      
            <div class="col" >
                <label for="segundoNombre">
                <strong>Segundo nombre: </strong><input style="width: 400px;" class="form-control" type="text" id="segundoNombre" placeholder="Ingrese su segundo nombre" value="` + infoUsuario.nombreDos + `" />
            </div>         
      
            <div class="col" >
                <label for="primerApellido">
                <strong>Primer apellido: </strong><input style="width: 400px;" class="form-control" type="text" id="primerApellido" placeholder="Ingrese su apellido"  value="` + infoUsuario.apellido + `" />
                </label>
            <div class="invalid-feedback">
                Debe ingresar su apellido
            </div> 
            </div> 


            <div class="col">
                <label for="segundoApellido">
                <strong>Segundo apellido:  </strong><input style="width: 400px;" class="form-control" type="text" id="segundoApellido" placeholder="Ingrese su segundo apellido" value="` + infoUsuario.apellidoDos + `"  />
                </label>
            </div>         
            
      
            <div class="col">
                <label for="edad">
                <strong>Edad: </strong><input style="width: 400px;" class="form-control" type="number" id="edad" placeholder="Ingrese su edad" value="` + infoUsuario.edad + `" />
                </label>
            <div class="invalid-feedback">
                Debe ingresar su edad
            </div> 
            </div>
        
            <div class="col">
                <label for="modEmail">
                <strong>Correo electrónico: </strong><input style="width: 400px;" class="form-control" type="text" id="modEmail" value="` + localStorage.getItem("email") + `"/>
                </label>
            <div class="invalid-feedback">
                No puede dejar este campo vacío
            </div> 
            </div> 

            <div class="col">
                <label for="tel">
                <strong>Teléfono: </strong><input style="width: 400px;" class="form-control" type="number" id="tel" placeholder="Ingrese su teléfono" value="` + infoUsuario.tel + `" />
                </label>
            <div class="invalid-feedback">
                Debe ingresar un número de teléfono
            </div> 
            </div>

            <div class="col">
                <label for="urlImagen">
                <strong>Subir imágen de usuario: </strong><input style="width: 400px;" type="text" class="form-control" id="urlImagen" placeholder="pegar URL para imágen de perfil"/>
                <br>
                <button type="button" class="class="botModal"" id="urlSubirImg"><a href="https://imgbb.com/upload" target="_blank">Subir imágen</a></button> 
                </label>
            </div>  
    
            <br>
    
            <div class="col">
                <label for="guardarCambios" >
                <input style="width: 400px; margin-top: 20px" class="btn btn-primary btn-lg" type="submit" onclick="guardarPerfil()" value="Guardar Cambios" id="guardarCambios">
                </label>
            </div>

      </div>
      </div>
    `

    document.getElementById("mostrarPerfil").innerHTML = htmlContentToAppend;

}
