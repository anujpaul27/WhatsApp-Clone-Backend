const express = require('express');
const { getAllUsers } = require('../controllers/users.controller');
const userRouter = express.Router()

userRouter.get('/:currentUserId', getAllUsers);

module.exports = userRouter;