import { ArrowDownward, Clear } from "@mui/icons-material";
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";



const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
       <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Buscar</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            value={filterText}
            onChange={onFilter}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Borrar Busqueda"
                  onClick={onClear}
                  edge="end"
                >
                    <Clear />
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
</>
); 


const sortIcon = <ArrowDownward />;

export const Datatables = () => {

	

const columns = [
   {
       name: 'UUID (Folio Físcal)',
       selector : row => row.uuid,
       sortable: true,
       },
       {
       name: 'Número de Factura',
       selector : row => row.factura,
       sortable: true,
       },
       {
       name: 'Total',
       selector : row => row.name,
       sortable: true,
       },
       {
       name: 'Folio de Pago',
       selector : row => row.name,
       sortable: true,
       },
       {
       name: 'Estatus',
       selector : row => row.name,
       sortable: true,
       },
       {
       name: 'Numero de OC',
       selector : row => row.name,
       sortable: true,
       },
       {
       name: 'Razón Social',
       selector : row => row.name,
       sortable: true,
       },
       {
       name: 'Fecha Recepción',
       selector : row => row.name,
       sortable: true,
       },
       {
       name: 'Empresa',
       selector : row => row.name,
       sortable: true,
       },
       {
       name: 'PDF',
       selector : row => row.name,
       sortable: true,
       },
       {
       name: 'XML',
       selector : row => row.name,
       sortable: true,
       },
       {
       name: 'CEP',
       selector : row => row.name,
       sortable: true,
       },

];

const data = [
   {
       uuid: "123",
       factura : "456"
   },
   {
       uuid: "99999",
       factura: "11111"
   },
];


        	const [filterText, setFilterText] = useState('');
        	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

        	const filteredItems = data.filter(
                   item => ( item.uuid && item.uuid.toLowerCase().includes(filterText.toLowerCase()) ) 
                   || ( item.factura && item.factura.includes(filterText.toLowerCase()) )
                );
        
        	const subHeaderComponentMemo = useMemo(() => {
        		const handleClear = () => {
        			if (filterText) {
        				setResetPaginationToggle(!resetPaginationToggle);
        				setFilterText('');
        			}
        		};
        
        		return (
        			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        		);
        	}, [filterText, resetPaginationToggle]);

            const localizedTextsMap = {
                columnMenuUnsort: "não classificado",
                columnMenuSortAsc: "Classificar por ordem crescente",
                columnMenuSortDesc: "Classificar por ordem decrescente",
                columnMenuFilter: "Filtro",
                columnMenuHideColumn: "Ocultar",
                columnMenuShowColumns: "Mostrar colunas"
              };

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
                <DataTable 
                    // title="Mis documentos"
                    columns={columns}
                    data={filteredItems}
                    pagination
			        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    sortIcon={sortIcon}
                    subHeader
			        subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                    responsive={true}
                    striped={true}
                    localization={{
                        
                        actions: 'Ações',
                        and: 'e',
                        cancel: 'Cancelar',
                        changeFilterMode: 'Alterar o modo de filtro',
                        changeSearchMode: 'Alterar o modo de pesquisa',
                        clearFilter: 'Limpar filtros',
                        clearSearch: 'Limpar pesquisa',
                        clearSort: 'Limpar classificações',
                        clickToCopy: 'Clique para copiar',
                        // ... and many more - see link below for full list of translation keys
                      }}
                    
                />
            </Grid>
        </Grid>
    )
}
