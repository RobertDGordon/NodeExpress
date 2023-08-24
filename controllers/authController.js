'use strict'

const bcrypt = require('bcrypt')

const Models = require('../models')

const signUpUser = async(data, res) => {
  const rounds = 10
  const version = "a"
  const salt = await bcrypt.genSaltSync(rounds, version)
  const originalPassword = data.password
  const hashedPassword = bcrypt.hashSync(originalPassword, salt)

  data.password = hashedPassword;

  Models.User.create(data)
    .then((data)=> {
      data.password = originalPassword
      res.send({result: 201, success: true, data: data})
    })
    .catch(err => {
      console.log("Error:", err),
      res.status(400).json({message: err})
      // throw err
    })
}

const loginUserByEmail = (data, res)=> {
  const unhashedPassword = data.password
  const email = data.email

  Models.User.scope('withPassword').findAll({ where: {email: email}})
    .then((data) => {
      //if user is found
      if(data.length > 0){
        if(data && bcrypt.compareSync(unhashedPassword, data[0].dataValues.password)){
          data[0].dataValues.password = undefined //removes the key from the response
          res.status(200).send({ success: true, data: data})
        } else {
          console.log('password is incorrect')
          res.status(403).send({ success: false, message: "Wrong username or password!"})
        }
      } else {
        //user is not found
        res.status(403).send({ success: false, message: "Wrong username or password!"})
      }
      
    })
    .catch(err => {
      console.log("Error:", err)
      throw err
    })
}

module.exports = {
  signUpUser,
  loginUserByEmail
}