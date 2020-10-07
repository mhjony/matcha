const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

router.get('/', verify, async(req, res) => {
    res.json({posts : {title: 'This is title', description: 'This is the description'}})
})

module.exports = router;