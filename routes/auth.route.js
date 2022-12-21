let express = require('express');
let router = express.Router();

const {signUpControllers, loginController, updateUser, deleteUser} = require('../controllers/auth.controllers')
const {isAuthenticated} = require ('../middleware/jwt.middleware')


router.post('/signup', signUpControllers);

router.post('/login', loginController );

router.get('/verify', isAuthenticated , (req, res, next) => {
    console.log(req.payload);
    res.json(req.payload)
})


//  update user info 

router.put('/user/update', isAuthenticated, updateUser )

//delate user account
router.delete('/user/delete' , isAuthenticated, deleteUser)

module.exports = router;