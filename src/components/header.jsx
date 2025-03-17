// Header.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, rgbToHex } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import logo2 from "../assets/tce_logo.png";

const Header = ({ toggleDarkMode }) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{backgroundColor:'black'}}> 
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1}}>
          <img src={logo2} alt="College Logo" style={{ width: 50, marginRight: 16 }} />
          <Typography variant="h6" component="div">
    
          </Typography>
        </Box>
        {/*<Button color="inherit">Login</Button>
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {document.body.classList.contains("dark-mode") ? <Brightness7 /> : <Brightness4 />}
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
