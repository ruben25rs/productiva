var menutogle  = document.getElementById(".menu-toggle");
if(menutogle)
{
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        this.classList.toggle('active');
    });
    document.querySelector('.hamburger').addEventListener('click', function() {
        this.classList.toggle('active');
    });
}


