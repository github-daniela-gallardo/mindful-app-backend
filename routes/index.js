var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/quote', function (req, res, next) {
  axios.get('https://zenquotes.io/api/random')
    .then(axiosResponse => {
      res.send(axiosResponse.data)
    })
    .catch(err => console.log(err))
});

module.exports = router;
