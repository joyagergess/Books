const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost:27017/book")
.then(()=>console.log("connected"));
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});
