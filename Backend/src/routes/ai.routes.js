import { Router } from "express"
import { createInterview } from "../controller/ai.controller.js"
import { verifyJwt } from "../middleware/auth.middleware.js"

const aiRoutes = Router()
aiRoutes.post('/create-interview', verifyJwt,createInterview)

export { aiRoutes }