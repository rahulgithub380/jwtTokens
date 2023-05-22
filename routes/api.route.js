const router = require('express').Router();
const {signup_users,read_user_data,login_user} = require('../controlls/handlers')
router.post('/signup_user',signup_users)
router.get('/read_user_data',read_user_data)
router.post('/login_user',login_user)
router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;
