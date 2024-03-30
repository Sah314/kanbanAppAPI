import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
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


const boardSchema = new Schema({
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
const Board = model('Board', boardSchema);
export default Board;
