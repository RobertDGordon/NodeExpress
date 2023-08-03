const express = require('express')
const router = express.Router()

const Controllers = require('../controllers')

//localhost:8000/api/auth/signup
router.post("/signup", (req, res) => {
  Controllers.authController.signUpUser(req.body, res)
})

//localhost:800/api/auth/login
router.post("/login", (req, res) => {
  Controllers.authController.loginUserByEmail(req.body, res)
})

module.exports = router;