var express = require('express');
var router = express.Router();

var { new_text, get_new_text, all_texts  } = require('../controllers/textController');

/* GET home page. */
router.get('/', get_new_text);

/* POST finished text */
router.post('/finished', new_text);

router.get('/finished/:theme', all_texts)

module.exports = router;
