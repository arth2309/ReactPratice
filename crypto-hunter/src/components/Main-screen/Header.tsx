import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



const Header : React.FC = () => {

    const [currencyType, setCurrencyType] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setCurrencyType(event.target.value);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color={'success'}>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
               
              >
                <strong>Crypto Hunter</strong>
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={currencyType}
          onChange={handleChange}
          autoWidth
          label="type"
          sx={{ color: 'white' }} 
          
          
          
        >

          
          <MenuItem value={'INR'}>INR</MenuItem>
          <MenuItem value={'Dollar'}>Dollar</MenuItem>
        </Select>
      </FormControl>
            </Toolbar>
          </AppBar>
        </Box>
      );


}


export default Header