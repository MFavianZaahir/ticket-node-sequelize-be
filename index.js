const express = require(`express`)
const app = express()
const cors = require(`cors`)
const { verifyToken } = require('./middleware/authMiddleware');
const userRoute = require(`./routes/user.route`)
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use(cors())
app.use(`/user`, userRoute)
app.use('/auth', authRoutes);

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server of Ticket Sales runs on port ${PORT}`)
})