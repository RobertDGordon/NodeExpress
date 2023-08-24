const express = require('express')
const router = express.Router()

const Controllers = require('../controllers')

//localhost:8000/api/auth/signup
router.post("/signup", (req, res) => {
  //Add validation
  if(req.body.email && req.body.firstName && req.body.lastName && req.body.lastName){
    Controllers.authController.signUpUser(req.body, res)
  } else {
    res.status(400).json({message: "Missing required information"})
  }
  
})

//localhost:8000/api/auth/login
router.post("/login", (req, res) => {
  Controllers.authController.loginUserByEmail(req.body, res)
})

module.exports = router;