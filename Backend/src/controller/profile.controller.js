import { User } from "../models/user.model.js";
import { userDetail } from "../models/userDetail.model.js";

async function updateProfileInfo(req, res) {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized request",
        });
    }

    const { description, skills, location, fieldOfExpertise, profileName } = req.body;

    const hasFields =
        description !== undefined ||
        skills !== undefined ||
        location !== undefined ||
        fieldOfExpertise !== undefined ||
        profileName !== undefined;

    if (!hasFields) {
        return res.status(400).json({
            message: "At least one field is required to update",
        });
    }

    try {
        const updateFields = {};

        if (profileName !== undefined) {
            updateFields.profileName = profileName.trim();
        }
        if (description !== undefined) {
            updateFields.description = description.trim();
        }
        if (location !== undefined) {
            updateFields.location = location.trim();
        }
        if (fieldOfExpertise !== undefined) {
            updateFields.fieldOfExpertise = fieldOfExpertise.trim();
        }

        if (skills !== undefined) {
            let skillsArray = [];

            if (Array.isArray(skills)) {
                skillsArray = skills;
            } else if (typeof skills === "string") {
                try {
                    skillsArray = JSON.parse(skills);
                } catch {
                    skillsArray = skills
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean);
                }
            }

            updateFields.skills = skillsArray
                .map((skill) => String(skill).trim())
                .filter(Boolean);
        }

        const updatedProfile = await userDetail.findOneAndUpdate(
            { userId },
            { $set: updateFields },
            { new: true, upsert: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(500).json({
                message: "Failed to update profile info",
            });
        }

        return res.status(200).json({
            message: "User profile info updated successfully",
            additionalInfo: updatedProfile,
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
            .findById(userId)
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