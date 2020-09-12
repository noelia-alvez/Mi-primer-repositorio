var productsArray = [];


function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let products = array[i];

        htmlContentToAppend += `
        <a href="https://noelia-alvez.github.io/mi-primer-repositorio/product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt=" " class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ products.name +`</h4>
                            <ul>
                                <ol class="mb-1">` + products.cost + ` ` + products.currency + `</ol>
                                <ol class="mb-1">` + products.soldCount + ` vendidos</ol>
                                
                            </ul>
                    </div>
                     <p> ` + products.description + `<p>

                </div>
            </div>
        </a>
        `

        document.getElementById("cat-list-container").innerHTML=htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status == "ok")
        {
            productsArray = resultObj.data;
            //Muestro los productos ordenados
            showProductsList(productsArray);
        }
    })
})

const ORDER_ASC_BY_PRICE = "$->$$";
const ORDER_DESC_BY_PRICE = "$$->$";
const ORDER_BY_PROD_REL = "RR->R";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;
var texto = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) { //función que ordena por precio de forma ascendente 
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){ //función que ordena por precio de forma descendente
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){ //función que ordena por cantidad de vendidos
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount); //se modifica nombre count por soldCount (JSON products)
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){
//se modifica para filtrar por precio
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];
        let nombreProd = products.name.toLowerCase();
        let descProd = products.description.toLowerCase();

        if (
            ((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost)) &&
            ((descProd.indexOf(texto) !== -1 || (nombreProd.indexOf(texto) !== -1)) || (texto == undefined ))
        ){
// se modifica htmlContentToAppend para que coincida con LISTADO de productos
                htmlContentToAppend += `
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + products.imgSrc + `" alt=" " class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ products.name +`</h4>
                                    <ul>
                                        <ol class="mb-1">` + products.cost + ` ` + products.currency + `</ol>
                                        <ol class="mb-1">` + products.soldCount + ` vendidos</ol>
                                
                                    </ul>
                                    
                            </div>
                             <p> ` + products.description + `<p>
        
                        </div>
                    </div>
                </div>
                `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){ //Función que ordena y muestra los productos
    currentSortCriteria = sortCriteria; 

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){ //se cambia JSON categories por PRODUCTS_URL
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";
        document.getElementById("buscar").value = "";
        texto = undefined;
        minCost = undefined;
        maxCost = undefined;
      
        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }
        
        showProductsList();
    });


        var busqueda = document.getElementById("buscar"); //Obtengo el id que nombre como buscar en el input de tipo text en products.html
        busqueda.addEventListener("keyup", function(){ //Se ejecuta la función cada vez que se presiona una tecla
        texto = busqueda.value.toLowerCase(); //Se convierte en minúsculas
        showProductsList(productsArray); //Llama al método
    });
});
