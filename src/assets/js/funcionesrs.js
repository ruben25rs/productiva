export function userdatatable(){
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
                { width: '20%', targets: 0 }, // Sets the first column to 200px
                { width: '5%', targets: 2 }, // Sets the first column to 200px
                { width: '15%', targets: 4 }, // Sets the first column to 200px

            ]
        });



        }, 800)

    });
}
export function capdatatable(){
    $(document).ready(function() {
        setTimeout(function(){
            $('#capacitador').DataTable({
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
                { width: '20%', targets: 0 }, // Sets the first column to 200px
                { width: '5%', targets: 2 }, // Sets the first column to 200px
                { width: '20%', targets: 4 }, // Sets the first column to 200px

            ]
        });



        }, 800)

    });
}


export function encuestadatatable(){
    $(document).ready(function() {
        setTimeout(function(){
            $('#list').DataTable({
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
}

export function hola(){
    console.log('hola')
}