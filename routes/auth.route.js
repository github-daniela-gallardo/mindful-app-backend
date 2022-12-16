let express = require('express');
let router = express.Router();

const {signUpControllers} = require('../controllers/auth.controllers')

router.post('/', signUpControllers);

module.exports = router;