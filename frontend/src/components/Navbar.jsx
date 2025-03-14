import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#2E2E2E' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Book Library
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/books">View Books</Button>
        <Button color="inherit" component={Link} to="/add-book">Add Book</Button>
      
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
