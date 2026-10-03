import { generateInterviewQuestions } from '../services/ai.service.js';
import { Interview } from '../models/interview.model.js';

async function createInterview(req, res) {
    const userId = req.user?._id;
    if (!userId) {
        return res.status(401).json({
            message: 'Unauthorized request',
        });
    }

    const { jobRole, description, difficulty, numberOfQuestions, experienceLevel } = req.body ?? {};

    try {
        const questions = await generateInterviewQuestions(jobRole, difficulty, numberOfQuestions, experienceLevel, description);
        const interview = await Interview.create({
            userId,
            jobRole: jobRole.trim(),
            description: description.trim(),
            difficulty,
            numberOfQuestions,
            experienceLevel,
            status: "in_progress",
            questions,
        });

        return res.status(201).json({
            message: 'Interview created successfully',
            questions,
        });
    } catch (error) {
        console.error('Error creating interview:', error);
        return res.status(500).json({
            message: 'Error creating interview',
            error: error?.message || 'Unexpected error',
        });
    }
}

export { createInterview }