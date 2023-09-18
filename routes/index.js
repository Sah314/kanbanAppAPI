const express = require('express');
const authRoutes = require('./authRoutes')
const boardroutes = require('./boardroutes')
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', boardroutes);

module.exports = router;
