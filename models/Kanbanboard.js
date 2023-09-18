const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    duedate:{
      type:Date,
      required:true
    },
    labels:{
      type:[String]
    },
    priority:{
      type:String
    },
    createdAt:{
      type : Date ,
      default:Date.now()
    }
})


const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  userid:{
    type:String,
    required:true
  },
  todo:{
    type:[taskSchema]
  },
  inprogress:{
    type:[taskSchema]
  },
  finished:{
    type:[taskSchema]
  }
});
const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
