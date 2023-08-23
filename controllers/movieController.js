'use strict'

const Models = require('../models')

const getMovies = (res) => {
  Models.Movie.findAll({})
    .then((data) => {
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
      res.send({result: 200, data: data})
    })
    .catch(err => {
      console.log("Error:", err)
      throw err
    })
}


const createMovies = async (data, res) => {
  Models.Movie.create(data)
    .then((data) => {
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