
import { Box, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";








export const Home = () => {





    const columns = [
        {
            field: 'uuid',
            headerName: 'UUID (Foio Físcal)',
            minWidth: 140,
            editable: false,
            flex: 1,
        },
        {
            field: 'factura',
            headerName: 'Nro de Factura',
            width: 140,
            editable: false,
            flex: 1,
        },
        {
            field: 'total',
            headerName: 'Total',
            editable: false,
            flex: 1,
        },
        {
            field: 'foliopago',
            headerName: 'Folio de Pago',
            width: 120,
            editable: false,
            flex: 1,
        },
        {
            field: 'estatus',
            headerName: 'Estatus',
            editable: false,
        },
        {
            field: 'oc',
            headerName: 'Numero de OC',
            editable: false,
            width: 120,
            flex: 1,
        },
        {
            field: 'rz',
            headerName: 'Razón Social',
            editable: false,
            width: 110,
            flex: 1,
        },
        {
            field: 'fecha',
            headerName: 'Fecha Recepción',
            editable: false,
            width: 130,
        },
        {
            field: 'empresa',
            headerName: 'Empresa',
            editable: false,
            flex: 1,
        },
        {
            name: 'pdf',
            headerName: 'PDF',
            editable: false,
            width: 50,
            sortable: false
        },
        {
            field: 'xml',
            headerName: 'XML',
            editable: false,
            width: 50,
            sortable: false
        },
        {
            field: 'cep',
            headerName: 'CEP',
            editable: false,
            width: 50,
            sortable: false
        },
      ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];




    return (
        
        <Grid
            container
            spacing={0}
            // direction="column"
            // alignItems="center"
            // justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: 'background.main', padding: 1 }}
        >
            <Grid item xs={12} >
            <Box style={{ height: 450, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[10]}
                        // checkboxSelection
                        // disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: false }}
                        disableColumnMenu
                    />
                </Box>
            </Grid>
        </Grid>
       
    )
}
