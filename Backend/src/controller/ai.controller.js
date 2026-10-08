import mongoose from 'mongoose';
import { generateInterviewQuestions, evaluateInterviewAnswers } from '../services/ai.service.js';
import { Interview } from '../models/interview.model.js';
import { Revision } from '../models/revision.model.js';

const sanitizeQuestions = (questions = []) => {
    return (Array.isArray(questions) ? questions : []).map((item, index) => ({
        question: String(item?.question ?? '').trim(),
        idealAnswer: String(item?.idealAnswer ?? '').trim(),
        userAnswer: String(item?.userAnswer ?? '').trim(),
        order: Number(item?.order ?? index + 1),
    }));
};

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
            jobRole: String(jobRole ?? '').trim(),
            description: String(description ?? '').trim(),
            difficulty,
            numberOfQuestions,
            experienceLevel,
            status: 'in_progress',
            questions,
        });

        return res.status(201).json({
            message: 'Interview created successfully',
            interviewId: interview._id,
            questions: interview.questions,
            jobRole: interview.jobRole,
            difficulty: interview.difficulty,
            experienceLevel: interview.experienceLevel,
        });
    } catch (error) {
        console.error('Error creating interview:', error);
        return res.status(500).json({
            message: 'Error creating interview',
            error: error?.message || 'Unexpected error',
        });
    }
}

async function submitUserAnswers(req, res) {
    const userId = req.user?._id;
    const { interviewId, questions } = req.body ?? {};

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized request' });
    }

    if (!interviewId) {
        return res.status(400).json({ message: 'Interview id is required' });
    }

    try {
        const interview = await Interview.findOne({ _id: interviewId, userId });

        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        const updatedQuestions = sanitizeQuestions(questions.length ? questions : interview.questions);
        interview.questions = updatedQuestions.map((item) => ({
            ...item,
            idealAnswer: item.idealAnswer || interview.questions.find((q) => Number(q.order) === Number(item.order))?.idealAnswer || '',
        }));

        interview.status = interview.questions.every((item) => String(item.userAnswer ?? '').trim())
            ? 'in_progress'
            : interview.status;

        await interview.save();

        return res.status(200).json({
            message: 'Answers saved successfully',
            questions: interview.questions,
        });
    } catch (error) {
        console.error('Error saving interview answers:', error);
        return res.status(500).json({
            message: 'Error saving interview answers',
            error: error?.message || 'Unexpected error',
        });
    }
}

async function evaluateInterview(req, res) {
    const userId = req.user?._id;
    const { interviewId, questions } = req.body ?? {};

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized request' });
    }

    if (!interviewId) {
        return res.status(400).json({ message: 'Interview id is required' });
    }

    try {
        const interview = await Interview.findOne({ _id: interviewId, userId });

        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        const normalizedQuestions = sanitizeQuestions(questions.length ? questions : interview.questions);
        const evaluation = await evaluateInterviewAnswers(normalizedQuestions);

        interview.questions = normalizedQuestions;
        interview.strengths = evaluation.strengths;
        interview.improvements = evaluation.improvements;
        interview.overallScore = evaluation.overallScore;
        interview.status = 'completed';

        await interview.save();

        return res.status(200).json({
            message: 'Interview evaluated successfully',
            strengths: interview.strengths,
            improvements: interview.improvements,
            overallScore: interview.overallScore,
            questions: interview.questions,
        });
    } catch (error) {
        console.error('Error evaluating interview:', error);
        return res.status(500).json({
            message: 'Error evaluating interview',
            error: error?.message || 'Unexpected error',
        });
    }
}

async function bookmarkQuestion(req, res) {
    const userId = req.user?._id;
    const { interviewId, questionOrder } = req.body ?? {};

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized request' });
    }

    if (!interviewId || questionOrder === undefined || questionOrder === null) {
        return res.status(400).json({ message: 'Interview id and question order are required' });
    }

    try {
        const interview = await Interview.findOne({ _id: interviewId, userId });

        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        const question = interview.questions.find((item) => Number(item.order) === Number(questionOrder));

        if (!question) {
            return res.status(404).json({ message: 'Question not found in this interview' });
        }

        const revision = await Revision.findOneAndUpdate(
            { userId, interviewId, questionOrder: Number(questionOrder) },
            {
                userId,
                interviewId,
                questionOrder: Number(questionOrder),
                jobRole: interview.jobRole,
                question: question.question,
                userAnswer: question.userAnswer || '',
                idealAnswer: question.idealAnswer || '',
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return res.status(200).json({
            message: 'Question bookmarked successfully',
            revision,
        });
    } catch (error) {
        console.error('Error bookmarking question:', error);
        return res.status(500).json({
            message: 'Error bookmarking question',
            error: error?.message || 'Unexpected error',
        });
    }
}

async function getRevisionList(req, res) {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized request' });
    }

    try {
        const revisions = await Revision.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Revision list fetched successfully',
            revision: revisions,
        });
    } catch (error) {
        console.error('Error fetching revision list:', error);
        return res.status(500).json({
            message: 'Error fetching revision list',
            error: error?.message || 'Unexpected error',
        });
    }
}

async function getAllInterview(req, res) {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized request' });
    }

    try {
        const interviews = await Interview.find({ userId, isDeleted: false })
            .sort({ createdAt: -1, _id: -1 });

        return res.status(200).json({
            message: 'Interview history fetched successfully',
            interviews,
        });
    } catch (error) {
        console.error('Error fetching interview history:', error);
        return res.status(500).json({
            message: 'Error fetching interview history',
            error: error?.message || 'Unexpected error',
        });
    }
}

async function getHomeDashboard(req, res) {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized request' });
    }

    try {
        const interviewFilter = { userId, isDeleted: { $ne: true } };
        const [stats, recentInterviews, flashcardCount] = await Promise.all([
            Interview.aggregate([
                { $match: interviewFilter },
                {
                    $group: {
                        _id: null,
                        interviewCount: { $sum: 1 },
                        averageScore: {
                            $avg: {
                                $cond: [
                                    { $eq: ['$status', 'completed'] },
                                    '$overallScore',
                                    null,
                                ],
                            },
                        },
                    },
                },
            ]),
            Interview.find(interviewFilter)
                .select('jobRole status overallScore numberOfQuestions createdAt')
                .sort({ createdAt: -1, _id: -1 })
                .limit(3)
                .lean(),
            Revision.countDocuments({ userId }),
        ]);

        return res.status(200).json({
            message: 'Home dashboard fetched successfully',
            stats: {
                interviewCount: stats[0]?.interviewCount ?? 0,
                averageScore: Math.round(stats[0]?.averageScore ?? 0),
                flashcardCount,
            },
            recentInterviews,
        });
    } catch (error) {
        console.error('Error fetching home dashboard:', error);
        return res.status(500).json({
            message: 'Error fetching home dashboard',
            error: error?.message || 'Unexpected error',
        });
    }
}

async function getInterviewResult(req, res) {
    const userId = req.user?._id;
    const { interviewId } = req.params;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized request' });
    }

    if (!mongoose.isValidObjectId(interviewId)) {
        return res.status(400).json({ message: 'Valid interview id is required' });
    }

    try {
        const interview = await Interview.findOne({
            _id: interviewId,
            userId,
            isDeleted: { $ne: true },
        }).select('jobRole status overallScore strengths improvements questions createdAt');

        if (!interview) {
            return res.status(404).json({ message: 'Interview result not found' });
        }

        return res.status(200).json({
            message: 'Interview result fetched successfully',
            interview,
        });
    } catch (error) {
        console.error('Error fetching interview result:', error);
        return res.status(500).json({
            message: 'Error fetching interview result',
            error: error?.message || 'Unexpected error',
        });
    }
}

export { createInterview, submitUserAnswers, evaluateInterview, bookmarkQuestion, getRevisionList, getAllInterview, getHomeDashboard, getInterviewResult };