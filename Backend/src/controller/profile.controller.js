import { User } from "../models/user.model.js";
import { userDetail } from "../models/userDetail.model.js";
import { uploadFile } from "../services/imageKit.service.js";

async function updateProfileInfo(req, res) {
    const userId = req.user?._id;
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized request",
        });
    }

    const { description, skills, location, fieldOfExpertise, profileName } = req.body;
    const file = req.file;

    const sanitizeString = (value) => {
        if (typeof value !== "string") return undefined;
        const trimmed = value.trim();
        return trimmed ? trimmed : undefined;
    };

    try {
        const updateFields = {};

        const safeProfileName = sanitizeString(profileName);
        const safeDescription = sanitizeString(description);
        const safeLocation = sanitizeString(location);
        const safeFieldOfExpertise = sanitizeString(fieldOfExpertise);

        if (safeProfileName !== undefined) updateFields.profileName = safeProfileName;
        if (safeDescription !== undefined) updateFields.description = safeDescription;
        if (safeLocation !== undefined) updateFields.location = safeLocation;
        if (safeFieldOfExpertise !== undefined) updateFields.fieldOfExpertise = safeFieldOfExpertise;

        let skillsArray = [];

        if (Array.isArray(skills)) {
            skillsArray = skills;
        } else if (typeof skills === "string") {
            const trimmedSkills = skills.trim();
            if (trimmedSkills) {
                try {
                    const parsed = JSON.parse(trimmedSkills);
                    if (Array.isArray(parsed)) {
                        skillsArray = parsed;
                    }
                } catch {
                    skillsArray = trimmedSkills
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean);
                }
            }
        }

        const cleanedSkills = skillsArray
            .map((skill) => String(skill).trim())
            .filter(Boolean);

        if (cleanedSkills.length) {
            updateFields.skills = cleanedSkills;
        }

        if (file) {
            const result = await uploadFile(file.buffer);
            if (!result?.url) {
                return res.status(500).json({
                    message: "File upload failed",
                });
            }
            updateFields.resumeUrl = result.url;
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                message: "At least one valid field is required to update",
            });
        }

        const updatedProfile = await userDetail.findOneAndUpdate(
            { userId: userId },
            {
                $set: updateFields,
                $setOnInsert: {
                    userId: userId,
                },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );

        if (!updatedProfile) {
            return res.status(500).json({
                message: "Failed to update profile info",
            });
        }

        return res.status(200).json({
            message: "User profile info updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message:
                error?.message ||
                "Something went wrong while updating profile info",
        });
    }
}

async function getMe(req, res) {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({
            message: 'Unauthorized user request'
        });
    }

    try {
        const userInfo = await User.findById(userId)
        const profileDetails = await userDetail
            .findOne({ userId })
            .populate('userId', '-password -refreshToken')
            .lean();

        if (!userInfo) {
            return res.status(404).json({
                message: 'User profile not found'
            });
        }

        return res.status(200).json({
            message: 'User info retrieved successfully',
            userInfo,
            profileDetails
        });

    } catch (error) {
        return res.status(500).json({
            message: error?.message ||
                'Something went wrong while fetching user info'
        });
    }
}

export { updateProfileInfo, getMe }