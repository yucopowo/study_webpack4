const express = require('express')
const router = express.Router();

router.get('/company', function(req, res) {
    res.json({
        code: 200,
        message: 'company',
        data: {

        }
    });
});

module.exports = router;
