const { gettAllMessages, addMessage } = require('../controllers/messageController');
const router = require('express').Router();

router.post("/addMsg", addMessage);
router.post("/getAllMsg", gettAllMessages);

module.exports = router;