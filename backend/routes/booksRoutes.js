const express = require("express");
const router = express.Router();
const bookModel = require("../models/booksModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/")); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


// Add a book with image upload
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    console.log("Received:", req.body);
    console.log("File:", req.file);

    const { bookname, description, author, price } = req.body;
    if (!bookname || !description || !author || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Store file path (or URL if using cloud storage)
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newBook = new bookModel({
      bookname,
      description,
      author,
      price,
      image: imagePath, // ✅ Save image path
      read: false,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// GET request - Fetch all books
router.get("/getbooks", async (req, res) => {
    try {
        const books = await bookModel.find();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

//get with id

router.get("/getBooks/:id", async (req,res)=> {
    let book;
    const id=req.params.id;
    try{
       book=await bookModel.findById(id);
        res.status(200).json({book});
    }
        catch(error){
            console.log(error);
        }
    
});


// PUT request - Update book by ID
router.put("/updateBook/:id", async (req, res) => {
    const id = req.params.id;
    const { bookname, description, author, image, price } = req.body;

    try {
       
      
        const updatedBook = await bookModel.findByIdAndUpdate(id, {
            bookname,
            description,
            author,
            image,
            price,
        }, { new: true }); 
        

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({
            message: "Data updated successfully",
            updatedBook,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating book", error: error.message });
    }
});

// delete book by id
router.delete("/deleteBook/:id", async (req, res) => {
    const id = req.params.id;
    console.log("Trying to delete book with ID:", id); // Log the id to confirm it's being passed correctly
    
    try {
      const deletedBook = await bookModel.findByIdAndDelete(id);
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      console.log("Book deleted successfully", deletedBook);
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error("Error during deletion:", error);
      res.status(500).json({ message: "Error deleting book", error: error.message });
    }
  });


 // PUT request - Mark book as read by ID
router.put("/markAsRead/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const updatedBook = await bookModel.findByIdAndUpdate(
        id,
        { read: true },
        { new: true }   
      );
  
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      res.status(200).json({
        message: "Book marked as read successfully",
        updatedBook,
      });
    } catch (error) {
      console.error("Error marking as read:", error);
      res.status(500).json({ message: "Error marking book as read", error: error.message });
    }
  });
  
  router.put("/unmarkAsRead/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const updatedBook = await bookModel.findByIdAndUpdate(
        id,
        { read: false },  
        { new: true }     
      );
  
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      res.status(200).json({
        message: "Book unmarked as read successfully",
        updatedBook,
      });
    } catch (error) {
      console.error("Error unmarking as read:", error);
      res.status(500).json({ message: "Error unmarking book as read", error: error.message });
    }
  });
  

module.exports = router;
