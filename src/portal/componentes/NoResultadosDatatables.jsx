

import { SentimentVeryDissatisfied } from "@mui/icons-material"
import { Button, CircularProgress, FormControl, Grid, IconButton, 
    InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField, useMediaQuery } from "@mui/material"

export const NoResultadosDatatables = () => {
  return (
    <Grid container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center" sx={{mt:3, mb: 3}} >
         <Grid item>
             Sin resultado obtenidos
         </Grid>
    </Grid>
  )
}
