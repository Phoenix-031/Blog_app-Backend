const express = require('express')
const router = express.Router();
const {createPost,updatePost,deletePost, getPost, getallPost} = require('../controllers/postController');


router.post('/',createPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
router.get('/:id',getPost)
router.get('/',getallPost)

module.exports = router