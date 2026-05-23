import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/users.mjs'
import roomRoutes from './routes/rooms.mjs'
import bookingRoutes from './routes/bookings.mjs'

dotenv.config()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL!

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/bookings', bookingRoutes)

try {
  await mongoose.connect(MONGO_URL)
  console.log('Connected to MongoDB')
} catch (err) {
  console.error('MongoDB connection error:', err)
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});