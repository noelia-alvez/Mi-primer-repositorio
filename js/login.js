function inicio (){

    if (sessionStorage.getItem("contador") == null || sessionStorage.getItem("contador") ==0) {
        window.location.href="https://noelia-alvez.github.io/mi-primer-repositorio/login.html";
    }
}
