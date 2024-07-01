import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export  function Variants() {
  return (
    <Stack spacing={1} style={{textAlign:"center"}}>
      {/* For variant="text", adjust the height via font-size */}
     
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={100} height={100} />
    </Stack>
  );
}


