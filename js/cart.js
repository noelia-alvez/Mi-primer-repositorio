var cartArray = [];
let comissionPercentage = 0.15;
var costoDeEnvio = 15;
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

function showProductsCart(){

    let htmlContentToAppend = "";
    for (var i = 0; i < cartArray.length; i++){ 
        var article = cartArray[i];
        var subTotal = article.unitCost;
        document.getElementById("subTotal2").innerHTML = subTotal + ` ` + article.currency;
        document.getElementById("cDeEnvio").innerHTML = (subTotal * comissionPercentage)+ ` ` + article.currency;
        document.getElementById("total").innerHTML = (subTotal+ costoDeEnvio) + ` ` + article.currency;
        document.getElementById("selPago").innerHTML = "No ha seleccionado";

        htmlContentToAppend += `
            <div class="d-flex w-100 justify-content-between">
                <td><img width="100px" height="100px" src="` + article.src + `" alt=""></td>
                <td>` + article.name +`</td>
                <td>` + article.unitCost + ` ` + article.currency + `</td>
                <td><input type="number" style="width: 80px" min="1" value="1" id="cantUsuario"></td>  
                <td id="subTotal">` + subTotal + ` ` + article.currency +`</td>
                <td><input type="image" src="img/botonEl.jpg" width="48" height="48" onclick=eliminar();></td>
            </div>
        `

        document.getElementById("articlesWrapper").innerHTML=htmlContentToAppend;

        document.getElementById("cantUsuario").addEventListener("change", function(){
            let cantUser = document.getElementById("cantUsuario").value;
            subTotal = cantUser * article.unitCost;
            document.getElementById("subTotal").innerHTML = subTotal + ` ` + article.currency;
            document.getElementById("subTotal2").innerHTML = subTotal + ` ` + article.currency;
            actualizaEnvio();
            actualizaCostoTotal();
        });

        document.getElementById("tarjeta").addEventListener("change", function(){
            document.getElementById("selPago").innerHTML = `Tarjeta de crédito`;
        });
    
        document.getElementById("Transferencia").addEventListener("change", function(){
            document.getElementById("selPago").innerHTML = `Transferencia bancaria`;
        });
        
        document.getElementById("premium").addEventListener("change", function(){
            comissionPercentage = 0.15;
            actualizaEnvio();
            actualizaCostoTotal();
        });
            
        document.getElementById("express").addEventListener("change", function(){
            comissionPercentage = 0.07;
            actualizaEnvio();
            actualizaCostoTotal();
        });
        
        document.getElementById("standard").addEventListener("change", function(){
            comissionPercentage = 0.05;
            actualizaEnvio();
            actualizaCostoTotal();
        });
        
        function actualizaEnvio() {
            costoDeEnvio = subTotal * comissionPercentage;
            document.getElementById("cDeEnvio").innerHTML = parseInt(costoDeEnvio) + ` ` + article.currency;
        }

        function actualizaCostoTotal(){ 
            document.getElementById("total").innerHTML = subTotal + costoDeEnvio + ` ` + article.currency;
        }
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status == "ok")
        {   
            cartObj = resultObj.data;
            cartArray = cartObj.articles;
            
            showProductsCart();
        }
    })
})

function eliminar(){
    document.getElementById("articlesWrapper").innerHTML = " ";
    document.getElementById("msjEliminado").innerHTML = "El producto fue eliminado correctamente";
    document.getElementById("msjEliminado").classList.add('alert-success');
    document.getElementById("subTotal2").innerHTML = 0 + ` ` + "UYU";
    document.getElementById("cDeEnvio").innerHTML = 0 + ` ` + "UYU";
    document.getElementById("total").innerHTML = 0 + ` ` + "UYU";
    document.getElementById("calle").value = " ";
    document.getElementById("numero").value = null;
    document.getElementById("esquina").value = " ";
    document.getElementById("selPago").innerHTML = "No ha seleccionado";
}

document.getElementById("finalizarCompra").addEventListener("click", function(){
     
        let calleInput = document.getElementById("calle");
        let numeroInput = document.getElementById("numero");
        let esquinaInput = document.getElementById("esquina");
        let infoMissing = false;

        //Quito las clases que marcan como inválidos
        calleInput.classList.remove('is-invalid');
        numeroInput.classList.remove('is-invalid');
        esquinaInput.classList.remove('is-invalid');   


        //Se realizan los controles necesarios,
        //En este caso se controla que se haya ingresado la calle el número de puerta y la esquina.

        //Consulto por la calle
        if (calleInput.value === "")
        {
            calleInput.classList.add('is-invalid');
            infoMissing = true;
        }
        
        //Consulto por el número
        if (numeroInput.value === "")
        {
            numeroInput.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por la esquina
        if (esquinaInput.value === "")
        {
            esquinaInput.classList.add('is-invalid');
            infoMissing = true;
        }
        
        if(!infoMissing)
        {
            //Aquí ingresa si pasó los controles, irá a enviar
            //la solicitud para mostrar el mensaje de compra éxitosa

            getJSONData(CART_BUY_URL).then(function(resultObj){
                
                let msgToShowHTML = document.getElementById("mensajeOk");
                let msgToShow = "";
    
                //Si la publicación fue exitosa, devolverá mensaje de éxito,
                //de lo contrario, devolverá mensaje de error.
                if (resultObj.status === 'ok')
                {
                    msgToShow = resultObj.data.msg;
                    document.getElementById("mensajeOk").classList.add('alert-success');
                    document.getElementById("mensajeOk").classList.add('alert2');
                    document.getElementById("mensajeOk").classList.add('fade');
                }
                else if (resultObj.status === 'error')
                {
                    msgToShow = ERROR_MSG;
                    document.getElementById("mensajeOk").classList.add('alert-danger');
                }
    
                msgToShowHTML.innerHTML = msgToShow;
                document.getElementById("mensajeOk").classList.add("show");
            });
        }
        //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
        if (e.preventDefault) e.preventDefault();
            return false;
    });
