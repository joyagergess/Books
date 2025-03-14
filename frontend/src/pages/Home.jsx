import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Your Personal Library</h1>
      <p className="home-description">
        Organize, track, and explore your book collection effortlessly.
      </p>
      <div className="home-buttons">
        <Button variant="contained" className="home-button" onClick={() => navigate("/books")}>
          View My Books
        </Button>
        <Button variant="outlined" className="home-button outlined" onClick={() => navigate("/add-book")}>
          Add a New Book
        </Button>
      </div>
    </div>
  );
};

export default Home;
