const express = require(`express`)
const app = express()
app.use(express.json())

const ticketController = require(`../controllers/ticket.controller`)

app.post("/", ticketController.addTicket)
app.get("/", ticketController.getAllTicket)
app.get("/:id", ticketController.ticketByID)

module.exports = app