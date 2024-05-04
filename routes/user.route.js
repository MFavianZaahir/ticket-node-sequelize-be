const express = require(`express`)
const app = express()
const userController =
app.use(express.json())

require(`../controllers/user.controller`)
app.get("/", userController.getAllUser)
app.get("/:key", userController.findUser)
app.post("/", userController.addUser)
app.put("/:id", userController.updateUser)
app.delete("/:id", userController.deleteUser)

module.exports = app