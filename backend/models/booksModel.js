const mongoose = require ("mongoose");

const bookSchema = new mongoose.Schema({
   bookname:{type: String, required:true},
   description:{type: String, required:true},
   author:{type: String, required:true},
   image:{type: String, required:false},
   price:{type: Number, required:true},
   read: { type: Boolean,default: false 
    }
});
module.exports = new mongoose.model("books", bookSchema)