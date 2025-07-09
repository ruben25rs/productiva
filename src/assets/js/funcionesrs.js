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
                { width: '30%', targets: 0 }, // Sets the first column to 200px

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