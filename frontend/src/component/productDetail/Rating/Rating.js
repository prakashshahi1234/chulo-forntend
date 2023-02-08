import React from 'react';
import "./rating.css";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function BasicRating() {
  const [value, setValue] = React.useState(4.5);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
        zIndex:1,
        display:"flex",
        alignItems:"center"
      }}
    >

      {/* <Typography component="legend">Rating</Typography> */}
      <Rating
        name="simple-controlled"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
        setValue(newValue);
        }}
        
      />
     <p>4.5/49</p>
    </Box>

  );
}
