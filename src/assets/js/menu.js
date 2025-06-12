
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



$(document).ready(function() {
    
    setTimeout(function(){

        $('#users').DataTable({
            dom: 'Bfrtip',
            responsive: true,
            buttons: [
                {
                    extend: 'copy',
                    exportOptions: {

                    }
                },
                {
                    extend: 'csv',
                    exportOptions: {

                    }
                },
                {
                    extend: 'excel',
                    exportOptions: {

                    }
                },
                {
                    extend: 'pdf',
                    exportOptions: {

                    }
                },
            ],
            columnDefs: [
                { width: '30%', targets: 0 }, // Sets the first column to 200px
                        
            ]
        });



    }, 800)
    
});
