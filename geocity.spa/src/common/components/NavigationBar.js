import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MapIcon from '@mui/icons-material/Map';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

export default function NavigationBar() {
  
  const location = useLocation();
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "#10377a", zIndex:1400 }} position="static" >
        <Toolbar>
          <IconButton
            component={Link}
            to="/discover"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 5, color: "#ffffff"}}
          >
            <MapIcon />
          </IconButton>
            <Button 
              component={Link}
              to="/discover"
              sx = {{ 
                width: "150px", 
                marginRight: "15px", 
                color: location.pathname.includes("discover") ? "#ffffff" : "#9fafce", 
                '&:hover': { 
                  color: '#ffffff' } 
                }} 
              size="small" 
              color="inherit" 
              variant="outlined">
              Discover
            </Button>
          <Button 
            component={Link}
            to="/itinary-form"
            sx = {{ 
              width: "150px", 
              color: location.pathname.includes("itinary-form") ? "#ffffff" : "#9fafce",
              '&:hover': { 
                color: '#ffffff' } 
              }} 
            size="small" 
            color="inherit" 
            variant="outlined">
            Create
          </Button>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button 
            component={Link}
            to="/login"
            sx = {{ 
              color: location.pathname.includes("login") ? "#ffffff" : "#9fafce",
              '&:hover': { 
                color: '#ffffff' } 
              }} 
            size="small" 
            color="inherit" 
            variant="outlined">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}