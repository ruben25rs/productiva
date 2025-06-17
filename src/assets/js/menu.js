<<<<<<< HEAD

document.addEventListener("DOMContentLoaded", () => {

    var pathst = location.pathname

    if (pathst=="/inicio"||pathst=="/nosotros"||pathst=="/cursos"||pathst=="/contacto"||pathst=="/ingresar") {


        document.querySelector('.menu-toggle').addEventListener('click', function() {
            this.classList.toggle('active');
        });
        document.querySelector('.hamburger').addEventListener('click', function() {
            this.classList.toggle('active');
        });

    }



});



$(window).on('popstate', function(event) {
    document.title = "Patch Up";
    console.log("sssss"+location.pathname)
});
document.addEventListener("popstate", (event) => {
  console.log("sssss"+location.pathname)
});




=======

document.addEventListener("DOMContentLoaded", () => {

    var pathst = location.pathname

    if (pathst=="/inicio"||pathst=="/nosotros"||pathst=="/cursos"||pathst=="/contacto"||pathst=="/ingresar") {


        document.querySelector('.menu-toggle').addEventListener('click', function() {
            this.classList.toggle('active');
        });
        document.querySelector('.hamburger').addEventListener('click', function() {
            this.classList.toggle('active');
        });

    }



});



$(window).on('popstate', function(event) {
    document.title = "Patch Up";
    console.log("sssss"+location.pathname)
});
document.addEventListener("popstate", (event) => {
  console.log("sssss"+location.pathname)
});




>>>>>>> 2ba20efdc45ddd705fcb78ab732358d68b77950e
