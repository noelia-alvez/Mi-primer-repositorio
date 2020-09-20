var products = {};
var prodRel = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";
        let images = {
            img1: array[0],
            img2: array[1],
            img3: array[2],
            img4: array[3],
            img5: array[4],
        }

        htmlContentToAppend += `
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="` + images.img1 + `" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="` + images.img2 + `" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="` + images.img3 + `" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="` + images.img4 + `" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="` + images.img5 + `" class="d-block w-100" alt="...">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        `
        document.getElementById("carouselExampleIndicators").innerHTML = htmlContentToAppend;
    }

function showImagesGalleryRel(prodAll){

    let htmlContentToAppendRel = "";
            
        for (var i = 0; i < prodRel.length; i++){ 
            var pos = prodRel[i];
            var prodTemp = prodAll[pos] 
            
            htmlContentToAppendRel += `
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail" src="` + prodTemp.imgSrc + `" alt=""> 
                    </div>
                </div>
           `
           document.getElementById("productImagesGalleryRel").innerHTML = htmlContentToAppendRel;
        }
}

function showComments(comm){

    let htmlContentToAppendCom = "";
           
        for(let i = 0; i < comm.length; i++){
        
        let comment = comm[i];
        let userScore = comment.score;
        let starRating = ""; 

        for (var a = 0; a < userScore; a++ ) {
            starRating += '<i class="fas fa-star checked"></i>'
        }
        for (var b = userScore; b < 5; b++ ){
            starRating += '<i class="fas fa-star"></i>'
        }

        htmlContentToAppendCom += `
            <div class="list-group-item list-group-item-action">
                        <div>
                            <p class="mb-1" style="text-align: left"><img src="img/logo2.png">Usuario: ` + comment.user + ` </p>
                            <p class="mb-1" style="text-align: left">Fecha: ` + comment.dateTime + ` horas</p>
                        </div>
                        
                    <h6 class="mb-1">Comentario: `+ comment.description +`</h6>
                    <p class="mb-1">Calificación: ` + starRating + `</p>
            
            </div>
        `        
        document.getElementById("productComments").innerHTML = htmlContentToAppendCom;
        }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.          
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCount = document.getElementById("productSoldCount");
            let productCategory =document.getElementById("productCategory")
            let prodMonedaPrecio = document.getElementById("productMonedaPrecio");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCount.innerHTML = product.soldCount;
            prodMonedaPrecio.innerHTML = product.currency + " " + product.cost
            productCategory.innerHTML = product.category;
            prodRel = product.relatedProducts;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    }
    getJSONData(PRODUCTS_URL).then(function(resultObj){
         if (resultObj.status === "ok"){
            products = resultObj.data;
            let prodRelacionados = document.getElementById("productImagesGalleryRel");
            prodRelacionados.innerHTML = products.imgSrc;
            showImagesGalleryRel(products);
        }
    });
});
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            prodComments = resultObj.data;
            
            showComments(prodComments);
        }
    });
});
