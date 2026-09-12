import { Router } from 'express'
import { verifyJwt } from '../middleware/auth.middleware.js'
import { updateProfileInfo, getMe } from '../controller/profile.controller.js'

const profileRoutes = Router()
profileRoutes.patch('/edit-details', verifyJwt, updateProfileInfo)
profileRoutes.get('/get-me', verifyJwt, getMe)

export { profileRoutes }