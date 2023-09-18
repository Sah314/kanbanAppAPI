const express = require('express');
//const { userLogin, userSignup } = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate')
const {getboards,createnewBoard,movetask} = require('../controllers/boardcontroller')
const router = express.Router();
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
router.post('/create',authenticate,createnewBoard);
router.patch('/:boardid/tasks/:taskid/move',movetask);



module.exports = router;