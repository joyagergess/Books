import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../App.css"; 

const AddBook = () => {
  const [book, setBook] = useState({
    bookname: "",
    description: "",
    author: "",
    price: "",
  });

  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); 

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bookname", book.bookname);
    formData.append("description", book.description);
    formData.append("author", book.author);
    formData.append("price", book.price);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:1000/api/v1/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        alert(`Failed to add book: ${errorText}`);
        return;
      }

      alert("Book added successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book.");
    }
  };

  return (
    <Container maxWidth="sm" className="add-book-container">
      <Typography variant="h4" gutterBottom className="add-book-title">
        Add a New Book
      </Typography>
      <form onSubmit={handleSubmit} className="add-book-form">
  <TextField
    label="Book Name"
    name="bookname"
    fullWidth
    required
    margin="normal"
    onChange={handleChange}
    className="input-field"
  />
  <TextField
    label="Description"
    name="description"
    fullWidth
    required
    margin="normal"
    onChange={handleChange}
    className="input-field"
  />
  <TextField
    label="Author"
    name="author"
    fullWidth
    required
    margin="normal"
    onChange={handleChange}
    className="input-field"
  />
  <TextField
    label="Price"
    name="price"
    type="number"
    fullWidth
    required
    margin="normal"
    onChange={handleChange}
    className="input-field"
  />
  
  <Typography variant="subtitle1" className="upload-label">
    Upload Image
  </Typography>
  <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
  
  {/* Wrap button inside a div */}
  <div className="add-book-button-container">
    <Button variant="contained" color="primary" type="submit" className="add-book-button">
      Add Book
    </Button>
  </div>
</form>

    </Container>
  );
};

export default AddBook;
