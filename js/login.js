function inicio (){

    var cont = localStorage.getItem("contador");
    if (cont == 0) {
        window.location.href="login.html";
    }
}
