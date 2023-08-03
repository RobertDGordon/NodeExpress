const express = require('express')
const router = express.Router()

const Controllers = require('../controllers')

//localhost:8000/api/users <<--base route
//localhost:8000/api/users/
router.get('/', (req, res)=> {
  Controllers.userController.getUsers(res)
})

module.exports = router;