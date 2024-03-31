import { Router } from 'express';
//const { userLogin, userSignup } = require('../controllers/userController');
import authenticate from '../middlewares/authenticate.js';

import {
  getBoards,
  createBoard,
  moveTask,
  createTask,
  getBoard,
} from "../controllers/boardcontroller.js";

const router = Router();

router.get('/',authenticate,getBoards);
router.get("/:boardId", authenticate, getBoard);
router.post("/createBoard", authenticate, createBoard);
router.post("/createTask/:boardId", authenticate, createTask);
router.patch("/:boardid/tasks/:taskId/move", authenticate, moveTask);

export default router;