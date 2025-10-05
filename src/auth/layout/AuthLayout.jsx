import { Grid, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";



export const AuthLayout = ({ children, title = '' }) => {

  const [animatedcontainer, setanimatedcontainer] = useState('animate__animated animate__bounceInRight');
  const {errorMessage} =  useSelector(state => state.auth);
  const isErrorMessage  = useMemo( () => errorMessage != null, [errorMessage] );



    useEffect(() => {
      if(isErrorMessage){
        setanimatedcontainer('');
      } 
    }, [isErrorMessage]);




  return (
    <Grid className={animatedcontainer}
    container
    spacing={ 0 }
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh', backgroundColor: 'background.main', padding: 4 }}
    >

      <Grid 
      item
      className="box-shadow"
      xs={ 3 }
      sx={{ 
        width: { md: 450 },
        backgroundColor: 'white', 
        padding: 3, 
        borderRadius: 2 
        }}
      >
        {/* {classAnimated} */}
        <center>
          <Typography  variant="h6" sx={{ mb: 1}}>{ title }</Typography>
        </center>
         
         {/* children */}
         { children }
    


      </Grid>
    </Grid>
  )
}