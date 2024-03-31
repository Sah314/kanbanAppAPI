import { Schema, model } from 'mongoose';

const boardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  backlog: {
    type: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },

  inprogress: {
    type: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  blocked: {
    type: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  waiting: {
    type: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },

  completed: {
    type: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
});

const Board = model('Board', boardSchema);

export default Board;
