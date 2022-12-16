let express = require('express');
let router = express.Router();

const {signUpControllers, loginController} = require('../controllers/auth.controllers')
const {isAuthenticated} = require ('../middleware/jwt.middleware')


router.post('/signup', signUpControllers);

router.post('/login', loginController );

router.get('/verify', isAuthenticated , (req, res, next) => {
    console.log(req.payload);
    res.json(req.payload)
})


module.exports = router;