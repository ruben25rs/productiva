

document.addEventListener("DOMContentLoaded", () => {

    var pathst = location.pathname

   document.querySelector('.menu-toggle').addEventListener('click', function() {
        this.classList.toggle('active');
    });
    document.querySelector('.hamburger').addEventListener('click', function() {
        this.classList.toggle('active');
    });



});



$(window).on('popstate', function(event) {
    document.title = "Patch Up";
    console.log("sssss"+location.pathname)
});
document.addEventListener("popstate", (event) => {
  console.log("sssss"+location.pathname)
});




