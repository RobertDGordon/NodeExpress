const express = require('express')
const router = express.Router()
const Controllers = require('../controllers')

// localhost:8000/api/movies/
router.get("/", (req, res) => {
  Controllers.movieController.getMovies(res)
})

// localhost:8000/api/movies/:<user_id>
router.get("/:id", (req, res) => {
  Controllers.movieController.getMoviesById(req, res)
})

// localhost:8000/api/movies/create
router.post("/create", (req, res) => {
  Controllers.movieController.createMovies(req.body, res)
})

// localhost:8000/api/movies/:<user_id>
router.put('/:id', (req, res) => {
  Controllers.movieController.updateMovie(req, res)
})

// localhost:8000/api/movies/:<user_id>
router.delete('/:id', (req, res) => {
  Controllers.movieController.deleteMovie(req, res)
})

module.exports = router;