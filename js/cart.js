var cartArray = [];
let comissionPercentage = 0.00;
var costoDeEnvio = 0;

function showProductsCart(){

    let htmlContentToAppend = "";
    for (var i = 0; i < cartArray.length; i++){ 
        var article = cartArray[i];
        var subTotal = article.unitCost;
        document.getElementById("subTotal2").innerHTML = subTotal + ` ` + article.currency;
        document.getElementById("cDeEnvio").innerHTML = costoDeEnvio + ` ` + article.currency;
        document.getElementById("total").innerHTML = (subTotal+costoDeEnvio) + ` ` + article.currency;


        htmlContentToAppend += `
            <div class="d-flex w-100 justify-content-between">
                <td><img width="100px" height="100px" src="` + article.src + `" alt=""></td>
                <td>` + article.name +`</td>
                <td>` + article.unitCost + ` ` + article.currency + `</td>
                <td><input type="number" style="width: 80px" min="1" value="1" id="cantUsuario"></td>  
                <td id="subTotal">` + subTotal + ` ` + article.currency +`</td>
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
