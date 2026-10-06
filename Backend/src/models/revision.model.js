import mongoose from 'mongoose'

const revisionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview',
        required: true,
        index: true,
    },
    questionOrder: {
        type: Number,
        required: true,
        min: 1,
    },
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
}, { timestamps: true })

revisionSchema.index({ userId: 1, interviewId: 1, questionOrder: 1 }, { unique: true })

const Revision = mongoose.model('Revision', revisionSchema)
export { Revision }
