"use strict";

const Models = require("../models");

const { Op } = require("sequelize")

const getMovies = (res) => {
  Models.Movie.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log("Error:", err);
      throw err;
    });
};

const getMoviesById = (req, res) => {
  Models.Movie.findAll({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log("Error:", err);
      throw err;
    });
};

const getMoviesByIds = (req, res) => {
  //See Sequelize Operators [Op.??]: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
  console.log(req.body.movie_ids)
  Models.Movie.findAll({ where: { id: { [Op.or]: req.body.movie_ids } } })
    .then((data) => {
      res.send({ result: 200, success: true, data: data });
    })
    .catch((err) => {
      console.log("Error:", err);
      throw err;
    });
};

const createMovies = async (data, res) => {
  Models.Movie.create(data)
    .then((data) => {
      res.send({ result: 201, data: data });
    })
    .catch((err) => {
      console.log("Error:", err);
      throw err;
    });
};

const updateMovie = (req, res) => {
  Models.Movie.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 201, data: data });
    })
    .catch((err) => {
      console.log("Error:", err);
      throw err;
    });
};

const deleteMovie = (req, res) => {
  Models.Movie.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 201, data: data });
    })
    .catch((err) => {
      console.log("Error:", err);
      throw err;
    });
};

module.exports = {
  getMovies,
  getMoviesById,
  getMoviesByIds,
  createMovies,
  updateMovie,
  deleteMovie,
};
