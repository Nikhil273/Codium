const expres = require('express')
const router = expres.Router();
const getReview = require('../controllers/ai.controller');

router.post('/get-review', getReview)


module.exports = router;