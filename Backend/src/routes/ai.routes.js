import { Router } from "express"
import {
    bookmarkQuestion,
    createInterview,
    evaluateInterview,
    getAllInterview,
    getHomeDashboard,
    getInterviewResult,
    getRevisionList,
    submitUserAnswers,
} from "../controller/ai.controller.js"
import { verifyJwt } from "../middleware/auth.middleware.js"

const aiRoutes = Router()
aiRoutes.post('/create-interview', verifyJwt, createInterview)
aiRoutes.patch('/userAnswer', verifyJwt, submitUserAnswers)
aiRoutes.patch('/user-answer', verifyJwt, submitUserAnswers)
aiRoutes.post('/evaluate', verifyJwt, evaluateInterview)
aiRoutes.post('/return', verifyJwt, evaluateInterview)
aiRoutes.post('/bookmark-question', verifyJwt, bookmarkQuestion)
aiRoutes.get('/revision', verifyJwt, getRevisionList)
aiRoutes.get('/getAllInterview', verifyJwt, getAllInterview)
aiRoutes.get('/home-dashboard', verifyJwt, getHomeDashboard)
aiRoutes.get('/interview/:interviewId/result', verifyJwt, getInterviewResult)

export { aiRoutes }