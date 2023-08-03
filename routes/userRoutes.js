const express = require('express')
const router = express.Router()
const Controllers = require('../controllers')

// localhost:8000/api/users/
router.get("/", (req, res) => {
  Controllers.userController.getUsers(res)
})

// localhost:8000/api/users/:<user_id>
router.get("/:id", (req, res) => {
  Controllers.userController.getUsersById(req, res)
})

// localhost:8000/api/users/create
router.post("/create", (req, res) => {
  Controllers.userController.createUsers(req.body, res)
})

// localhost:8000/api/users/login
router.post("/login", (req, res) => {
  Controllers.userController.getUsersByEmail(req, res)
})

// localhost:8000/api/users/:<user_id>
router.put('/:id', (req, res) => {
  Controllers.userController.updateUser(req, res)
})

// localhost:8000/api/users/:<user_id>
router.delete('/:id', (req, res) => {
  Controllers.userController.deleteUser(req, res)
})

module.exports = router;