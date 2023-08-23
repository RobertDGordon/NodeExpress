'use strict'

const bcrypt = require('bcrypt')

const Models = require('../models')

const getMovies = (res) => {
  Models.Movie.findAll({})
    .then((data) => {
      // Do NOT return passwords
      // Remove the password key before returning
      // Either through Javascript, OR through scope attribute, see: /models/Movie.js Line #45
      // for(const Movie in data){
      //   data[Movie].password = undefined //The Javascript way of removing a property.key
      // }
      res.send({result: 200, data: data})
    })
    .catch(err => {
      console.log("Error:", err)
      throw err
    })
}

const getMoviesById = (req, res) => {
  Models.Movie.findAll({ where: {id: req.params.id}})
    .then((data) => {
      //Do NOT return passwords
      res.send({result: 200, data: data})
    })
    .catch(err => {
      console.log("Error:", err)
      throw err
    })
}

// Should not use this to create Movies from front end, instead use the auth route/controller
// Leaving this here for your reference
const createMovies = async (data, res) => {
  // Bcrypt documentation: https://www.npmjs.com/package/bcrypt
  // Generate a salt, define the rounds
  const rounds = 10 //any more than 10 will take exponentially more CPU power
  const salt = await bcrypt.genSaltSync(rounds);
  const originalPassword = data.password
  const hashedPassword = bcrypt.hashSync(originalPassword, salt);
  data.password = hashedPassword;
  
  Models.Movie.create(data)
    .then((data) => {
      data.password = undefined; //Remove the password property
      res.send({result: 201, data: data})
    })
    .catch(err => {
      console.log("Error:", err)
      throw err
    })
}

const updateMovie = (req, res) => {
  Models.Movie.update(req.body, { where: {id: req.params.id}})
    .then((data) => {
      res.send({result: 201, data: data})
    })
    .catch(err => {
      console.log("Error:", err)
      throw err
    })
}

const deleteMovie = (req, res) => {
  Models.Movie.destroy( {where: {id: req.params.id}})
    .then((data) => {
      res.send({result: 201, data: data})
    })
    .catch(err => {
      console.log("Error:", err)
      throw err
    })
}

module.exports = {
  getMovies, getMoviesById, createMovies, updateMovie, deleteMovie
}