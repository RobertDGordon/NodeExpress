'use strict'

const bcrypt = require('bcrypt')

const Models = require('../models')

const getUsers = (res) => {
  Models.User.findAll({})
    .then((data) => {
      // Do NOT return passwords
      // Remove the password key before returning
      // Either through Javascript, OR through scope attribute, see: /models/user.js Line #45
      // for(const user in data){
      //   data[user].password = undefined //The Javascript way of removing a property.key
      // }
      res.send({result: 200, data: data})
    })
    .catch(err => {
      console.log("Error:", err)
      throw err
    })
}

const getUsersById = (req, res) => {
  Models.User.findAll({ where: {id: req.params.id}})
    .then((data) => {
      //Do NOT return passwords
      res.send({result: 200, data: data})
    })
    .catch(err => {
      console.log("Error:", err)
      throw err
    })
}

// Should not use this to create users from front end, instead use the auth route/controller
// Leaving this here for your reference
const createUsers = async (data, res) => {
  // Bcrypt documentation: https://www.npmjs.com/package/bcrypt
  // Generate a salt, define the rounds
  const rounds = 10 //any more than 10 will take exponentially more CPU power
  const salt = await bcrypt.genSaltSync(rounds);
  const originalPassword = data.password
  const hashedPassword = bcrypt.hashSync(originalPassword, salt);
  data.password = hashedPassword;
  
  Models.User.create(data)
    .then((data) => {
      data.password = undefined; //Remove the password property
      res.send({result: 201, data: data})
    })
    .catch(err => {
      console.log("Error:", err)
      throw err
    })
}

const updateUser = (req, res) => {
  Models.User.update(req.body, { where: {id: req.params.id}})
    .then((data) => {
      res.send({result: 201, success: true, data: data})
    })
    .catch(err => {
      console.log("Error:", err)
      throw err
    })
}

const updateMovieIds = (req, res) => {
  //first see if the user id exists
  Models.User.findAll({ where: {id: req.params.id}})
  .then((data) => {
    if(data.length > 0){
      // extract array from movie_ids
      const movie_ids = data[0].movie_ids
      // add new movie id to array
      movie_ids.push(req.body.movie_id)
      // update the record with new array
      Models.User.update({movie_ids}, {where: {id: req.params.id}})
      .then((data) => {
        res.send({result: 201, success: true, data: data})
      })
      .catch(err => {
        console.log("Error:", err)
        throw err
      })
    }else {
      //user does not exist
      res.status(404).json({success: false, message: "User not found"})
    }
  })
  .catch(err => {
    console.log("Error:", err)
    throw err
  })
}

const deleteUser = (req, res) => {
  Models.User.destroy( {where: {id: req.params.id}})
    .then((data) => {
      res.send({result: 201, data: data})
    })
    .catch(err => {
      console.log("Error:", err)
      throw err
    })
}

module.exports = {
  getUsers, getUsersById, createUsers, updateUser, updateMovieIds, deleteUser
}