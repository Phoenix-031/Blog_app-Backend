const express = require('express')
const router = express.Router();
const {cat,getallCat} = require('../controllers/categoryController');


router.post("/",cat);
router.get("/",getallCat);

module.exports = router