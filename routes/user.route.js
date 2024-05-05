const express = require(`express`)
const app = express()
app.use(express.json())

const { midOne } = require("../middlewares/simple-middleware")
const { validateUser } = require("../middlewares/user-validation")
const userController = require(`../controllers/user.controller`)

app.get("/", [midOne], userController.getAllUser)
app.post("/", validateUser, userController.addUser)
/** create route to update user
* using method "PUT" and define parameter for "id" */
app.put("/:id", validateUser, userController.updateUser)

app.get("/", userController.getAllUser)
app.get("/:key", userController.findUser)
app.post("/", userController.addUser)
app.put("/:id", userController.updateUser)
app.delete("/:id", userController.deleteUser)

module.exports = app