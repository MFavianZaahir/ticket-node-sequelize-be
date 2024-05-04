const express = require(`express`)
const app = express()
const cors = require(`cors`)
// const { verifyToken } = require('./middleware/authMiddleware');
const userRoute = require(`./routes/user.route`)
// const authRoutes = require('./routes/authRoutes');
const eventRoute = require(`./routes/event.route`)
const ticketRoute = require(`./routes/ticket.route`)

app.use(express.json());
// app.post('/protected-route', verifyToken, (req, res) => {
//     // This route requires authentication (verified by verifyToken)
//     res.json({ message: 'Welcome authorized user!' });
//   });
app.use(cors())
// app.use('/auth', authRoutes);
app.use(`/user`, userRoute);
app.use(`/event`, eventRoute);
app.use(`/ticket`, ticketRoute)


app.use(express.static(__dirname))

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server of Ticket Sales runs on port ${PORT}`)
})