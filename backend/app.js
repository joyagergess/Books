const express = require("express");
const cors = require("cors");
const app = express();
const bookRoute = require("./routes/booksRoutes");
require("./connection/conn");
const path = require("path");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    next();
  });
  
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use("/api/v1", bookRoute);

app.get("/", (req, res) => {
    res.send("Hello from the backend");
});

app.listen(1000, () => {
    console.log("Server started successfully on port 1000");
});
