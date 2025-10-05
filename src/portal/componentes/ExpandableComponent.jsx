
import { Typography } from '@mui/material';

const ExpandableComponent = ({ data }) => (
<div>
      <Typography sx={{fontSize: 12, paddingLeft: 8}} >
         Descripcion: {data.descripcion}
      </Typography>
</div>

  );
  
  export default ExpandableComponent;