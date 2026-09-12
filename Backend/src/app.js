import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authRoutes } from './routes/auth.routes.js'
import { profileRoutes } from './routes/profile.routes.js'
import morgan from 'morgan'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use('/api/auth-user', authRoutes)
app.use('/api/profile', profileRoutes)

export { app }