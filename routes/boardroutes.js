import { Router } from 'express';
//const { userLogin, userSignup } = require('../controllers/userController');
import authenticate from '../middlewares/authenticate.js';
import { getboards, createnewBoard, movetask, addnewtask, getABoard } from '../controllers/boardcontroller.js';
const router = Router();
const boards = [
    {
        userid:"Sahil_03",
        title:"abcde"
    }  ,
    {
        userid:"6507067d16271f619fb4e088",
        title:"pqrst"
    } 
];



router.get('/',authenticate,getboards);
router.get('/:boardId',authenticate,getABoard);
router.post('/create',authenticate,createnewBoard);
router.post('/addnewtask/:boardId',authenticate,addnewtask);
router.patch('/:boardid/tasks/:taskId/move',authenticate,movetask);



export default router;