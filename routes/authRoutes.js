const express = require('express');
const { userLogin, userSignup } = require('../controllers/userController');
const router = express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);

module.exports = router;