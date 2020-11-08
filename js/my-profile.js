function guardarPerfil() {

var nameOne = document.getElementById("primerNombre");
var nameTwo = document.getElementById("segundoNombre").value;
var surnameOne = document.getElementById("primerApellido");
var surnameTwo = document.getElementById("segundoApellido").value;
var age = document.getElementById("edad");
var phone = document.getElementById("tel");

sessionStorage.setItem("perfilUsuario",
    JSON.stringify(
    {
    nombre: nameOne.value,
    nombreDos: nameTwo,
    apellido: surnameOne.value,
    apellidoDos: surnameTwo,
    edad: age.value,
    correo: localStorage.getItem("email"),
    tel: phone.value,
    }
    ));
    nameOne.classList.remove('is-invalid');
     surnameOne.classList.remove('is-invalid');
     age.classList.remove('is-invalid');
     phone.classList.remove('is-invalid');
     
    let infoMissing = false;

    //Se realizan los controles necesarios,
    //En este caso se controla que se haya ingresado la calle el número de puerta y la esquina.

    //Consulto por el primer nombre
    if (nameOne.value === "")
    {
        nameOne.classList.add('is-invalid');
        infoMissing = true;
    }
    
    //Consulto por el primer apellido
    if (surnameOne.value === "")
    {
        surnameOne.classList.add('is-invalid');
        infoMissing = true;
    }

    //Consulto por la edad
    if (age.value === "")
    {
        age.classList.add('is-invalid');
        infoMissing = true;
    }

    //Consulto por el teléfono
    if (phone.value === "")
    {
        phone.classList.add('is-invalid');
        infoMissing = true;
    }
    
    if(infoMissing === false)
    {
                
            let msgToShowHTML = document.getElementById("mensajeCambios");
            

            //Si los datos obligatorios están completos muestro mensaje de guardado con éxito
            
             
                document.getElementById("mensajeCambios").classList.add('alert-success');
                document.getElementById("mensajeCambios").classList.add('alert2');
                document.getElementById("mensajeCambios").classList.add('fade');
           

            msgToShowHTML.innerHTML = "Se guardaron los cambios con éxito";
            document.getElementById("mensajeCambios").classList.add("show");
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    
    var correoUsuario = localStorage.getItem("email");
    document.getElementById("modEmail").value = correoUsuario;
    


imprimirResultados();

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
                <input style="width: 400px; margin-top: 20px" class="btn btn-primary btn-lg" type="submit" onclick="guardarPerfil();" value="Guardar Cambios" id="guardarCambios">
                </label>
            </div>

      </div>
      </div>
    `

    document.getElementById("mostrarPerfil").innerHTML = htmlContentToAppend;

}
