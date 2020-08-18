function inicio (){

    var cont = sessionStorage.getItem("contador");
    if (cont == 0) {
        window.location.href="https://noelia-alvez.github.io/mi-primer-repositorio/login.html";
    }
}
