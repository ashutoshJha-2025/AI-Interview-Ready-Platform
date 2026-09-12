import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, User, MapPin, Briefcase, X, Upload } from "lucide-react";
import { showSuccess, showError } from "../components/ToastMessageBox.jsx";

const ProfileUpdate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        profileName: "",
        location: "",
        fieldOfExpertise: "",
        description: "",
    });
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
                    withCredentials: true,
                });
                const user = result.data.data || result.data;
                setFormData({
                    name: user.name || "",
                    location: user.location || "",
                    fieldOfExpertise: user.fieldOfExpertise || "",
                    description: user.aboutMe || "",
                });
                setSkills(user.skills || []);
            } catch (error) {
                showError(error.response?.data?.message || "Could not load your profile");
            } finally {
                setFetching(false);
            }
        };
        fetchProfile();
    }, []);

    const addSkill = () => {
        const value = skillInput.trim();
        if (!value) return;
        if (skills.some((s) => s.toLowerCase() === value.toLowerCase())) {
            setSkillInput("");
            return;
        }
        setSkills([...skills, value]);
        setSkillInput("");
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter((s) => s !== skillToRemove));
    };

    const handleSkillKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addSkill();
        } else if (e.key === "Backspace" && !skillInput && skills.length) {
            setSkills(skills.slice(0, -1));
        }
    };

    const handleSubmit = async () => {
        const hasAnyField =
            formData.profileName.trim() ||
            formData.location.trim() ||
            formData.fieldOfExpertise.trim() ||
            formData.description.trim() ||
            skills.length > 0;

        if (!hasAnyField) {
            showError("At least one field is required to update");
            return;
        }

        setLoading(true);
        try {
            const result = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/profile/edit-details`,
                { ...formData, skills },
                { withCredentials: true }
            );
            showSuccess(result.data.message || "Profile updated");
            setTimeout(() => navigate("/profile"), 800);
        } catch (error) {
            showError(error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message || "Could not update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#FAF6EF] px-6 md:px-12 py-8">
            <div className="max-w-2xl mx-auto">

                <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 text-sm font-medium text-[#57534E] hover:text-[#0B4D3B] transition-colors mb-6 cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    Back to Profile
                </button>

                <h1 className="text-2xl font-semibold text-[#292524] mb-6">Edit Profile</h1>

                <div className="bg-white border border-[#EDE6D4] rounded-3xl shadow-xl p-6 md:p-8">
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#57534E] mb-1.5">
                                Profile Name
                            </label>
                            <div className="flex items-center gap-2 rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/50 px-3.5 py-2.5 focus-within:border-[#0B4D3B] focus-within:ring-2 focus-within:ring-[#0B4D3B]/15 transition-all">
                                <User size={16} className="text-[#A8A29E] shrink-0" />
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Your name"
                                    className="w-full bg-transparent text-sm text-[#292524] outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-[#57534E] mb-1.5">
                                    Location
                                </label>
                                <div className="flex items-center gap-2 rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/50 px-3.5 py-2.5 focus-within:border-[#0B4D3B] focus-within:ring-2 focus-within:ring-[#0B4D3B]/15 transition-all">
                                    <MapPin size={16} className="text-[#A8A29E] shrink-0" />
                                    <input
                                        id="location"
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="City, State"
                                        className="w-full bg-transparent text-sm text-[#292524] outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="fieldOfExpertise" className="block text-sm font-medium text-[#57534E] mb-1.5">
                                    Field of Expertise
                                </label>
                                <div className="flex items-center gap-2 rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/50 px-3.5 py-2.5 focus-within:border-[#0B4D3B] focus-within:ring-2 focus-within:ring-[#0B4D3B]/15 transition-all">
                                    <Briefcase size={16} className="text-[#A8A29E] shrink-0" />
                                    <input
                                        id="fieldOfExpertise"
                                        type="text"
                                        value={formData.fieldOfExpertise}
                                        onChange={(e) => setFormData({ ...formData, fieldOfExpertise: e.target.value })}
                                        placeholder="e.g. Web Dev"
                                        className="w-full bg-transparent text-sm text-[#292524] outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="aboutMe" className="block text-sm font-medium text-[#57534E] mb-1.5">
                                About Me
                            </label>
                            <textarea
                                id="aboutMe"
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Tell us a bit about yourself..."
                                className="w-full rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/50 px-3.5 py-2.5 text-sm text-[#292524] outline-none focus:border-[#0B4D3B] focus:ring-2 focus:ring-[#0B4D3B]/15 transition-all resize-none"
                            />
                        </div>

                        <div>

                            <label htmlFor="skills" className="block text-sm font-medium text-[#57534E] mb-1.5">
                                Skills
                            </label>
                            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/50 px-3 py-2.5 focus-within:border-[#0B4D3B] focus-within:ring-2 focus-within:ring-[#0B4D3B]/15 transition-all">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center gap-1.5 bg-[#FBF3E0] text-[#8A6A2C] text-xs font-medium border border-[#EFDDAF] px-2.5 py-1 rounded-full"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(skill)}
                                            aria-label={`Remove ${skill}`}
                                            className="hover:text-[#0B4D3B] cursor-pointer"
                                        >
                                            <X size={11} />
                                        </button>
                                    </span>
                                ))}
                                <input
                                    id="skills"
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={handleSkillKeyDown}
                                    onBlur={addSkill}
                                    placeholder={skills.length ? "Add another..." : "Add a skill and press Enter..."}
                                    className="flex-1 min-w-30 bg-transparent text-sm text-[#292524] outline-none py-1"
                                />
                            </div>
                        </div>

                        <label className="bg-white rounded-2xl border border-dashed border-[#D6D3D1] shadow-sm hover:border-[#C9A24B] hover:bg-[#FBF6E9] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2 px-6 py-6 text-center">
                            <Upload size={22} className="text-[#A8A29E]" />
                            <span className="text-sm font-medium text-[#78716C]">Upload Resume</span>
                            <input type="file" accept=".pdf" className="hidden" />
                        </label>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex-1 bg-[#C9A24B] text-[#073C2E] px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-[#E0BB63] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="px-6 py-2.5 rounded-xl text-sm font-medium text-[#57534E] border border-[#E7E1D3] hover:bg-[#FAF6EF] transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdate;
