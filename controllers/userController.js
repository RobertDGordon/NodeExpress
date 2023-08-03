'use strict'

const bcrypt = require('bcrypt')

const Models = require('../models')

const getUsers = (res) => {
  Models.User.findAll({})
    .then((data) => {
      res.send({result: 200, data: data})
    })
    .catch(err => {
      console.log("Error", err)
      throw err
    })
}

module.exports = {
  getUsers
}