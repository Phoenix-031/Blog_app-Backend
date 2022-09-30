const express = require('express')
const router = express.Router();
const {updateUser,deleteUser,getUser} = require('../controllers/userController');


router.patch('/:id',updateUser);
router.delete('/:id',deleteUser);
router.get('/:id',getUser);

module.exports = router