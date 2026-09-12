import mongoose from "mongoose"

const userDetailSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true,
        unique: true,
        index: true,
    },
    profileName: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    skills: {
        type: [String],
        trim: true,
    },
    resumeUrl: {
        type: String,
        trim: true,
    },
    fieldOfExpertise: {
        type: String,
        trim: true,
    },
    averageScore: {
        type: String,
        trim:true,
    },
}, { timestamps: true })

const userDetail = mongoose.model('userDetail', userDetailSchema)
export { userDetail }