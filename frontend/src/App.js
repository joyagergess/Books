import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";

function App() {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh' }}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add-book" element={<AddBook />} />

        </Routes>
      </Box>
    </Router>
  );
}

export default App;
