import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
    },
    userAnswer: {
        type: String,
        default: '',
        trim: true,
    },
    idealAnswer: {
        type: String,
        default: '',
        trim: true,
    },
    order: {
        type: Number,
        default: 1,
        min: 1,
    },
}, { _id: false })


const interviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    jobRole: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
        trim: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium',
    },
    numberOfQuestions: {
        type: Number,
        default: 5,
        min: 1,
        max: 15,
    },
    experienceLevel: {
        type: String,
        enum: ['Fresher', '1 - 3 years', '3 - 5 years', '5+ years'],
        default: 'Fresher',
    },
    status: {
        type: String,
        enum: ['created', 'in_progress', 'completed'],
        default: 'created',
    },
    questions: {
        type: [questionSchema],
        default: [],
    },
    overallScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    strengths: {
        type: [String],
        default: [],
    },
    improvements: {
        type: [String],
        default: [],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

const Interview = mongoose.model('Interview', interviewSchema)
export { Interview }