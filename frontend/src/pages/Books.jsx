import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Grid, Container, TextField } from "@mui/material";
import "../App.css"; // ✅ Ensure App.css is imported

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:1000/api/v1/getbooks");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:1000/api/v1/deleteBook/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBooks(books.filter((book) => book._id !== id));
      } else {
        alert("Failed to delete the book.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete the book.");
    }
  };

  const handleToggleRead = async (id, isRead) => {
    try {
      const endpoint = isRead
        ? `http://localhost:1000/api/v1/unmarkAsRead/${id}`
        : `http://localhost:1000/api/v1/markAsRead/${id}`;

      const response = await fetch(endpoint, { method: "PUT" });

      if (response.ok) {
        fetchBooks();
      } else {
        alert("Failed to toggle read status.");
      }
    } catch (error) {
      console.error("Error toggling read status:", error);
      alert("Failed to toggle read status.");
    }
  };

  const filteredBooks = books.filter((book) =>
    book.bookname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container
      maxWidth="100%"
      sx={{ width: "100%", paddingLeft: 0, paddingRight: 0, backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "20px" }}
    >
     
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 3, backgroundColor: "white", width: "25%" }}
      />

      <Grid container spacing={4} justifyContent="flex-start">
        {filteredBooks.length === 0 ? (
          <Typography variant="h6">No books found</Typography>
        ) : (
          filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
              <Card className="book-card" sx={{ padding: 2 }}>
                <CardContent>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={`http://localhost:1000${book.image}`}
                      alt={book.bookname}
                      style={{ width: "150px", height: "200px", objectFit: "cover", marginBottom: "15px" }} // Smaller image size
                    />
                  </div>
                  <Typography variant="h6" className="book-title" sx={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: "10px" }}>
                    {book.bookname}
                  </Typography>
                  <Typography variant="body2" className="book-description" sx={{ marginBottom: "10px" }}>
                    {book.description}
                  </Typography>
                  <Typography variant="body1" className="book-author" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                    Author: {book.author}
                  </Typography>
                  <Typography variant="body1" className="book-price" sx={{ fontWeight: "bold", marginBottom: "15px" }}>
                    Price: ${book.price}
                  </Typography>
                  <Typography variant="body2" color={book.read ? "success.main" : "text.secondary"} className="book-status" sx={{ marginBottom: "10px" }}>
                    {book.read ? "Read" : "Not Read"}
                  </Typography>
                  <div className="book-actions" style={{ display: "flex", gap: "10px" }}>
                    <Button variant="contained" color="error" onClick={() => handleDelete(book._id)}>
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color={book.read ? "warning" : "success"}
                      onClick={() => handleToggleRead(book._id, book.read)}
                    >
                      {book.read ? "Unmark as Read" : "Mark as Read"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Books;
