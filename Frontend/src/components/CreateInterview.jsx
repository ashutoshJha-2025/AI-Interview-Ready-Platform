import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Briefcase, ChevronDown, FileText } from "lucide-react";
import { showSuccess, showError, showWarning } from "../components/ToastMessageBox.jsx";

const EXPERIENCE_LEVELS = ["Fresher", "1 - 3 years", "3 - 5 years", "5+ years"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const QUESTION_COUNTS = [5, 10, 15];

const CreateInterview = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        jobRole: "",
        description: "",
        experienceLevel: EXPERIENCE_LEVELS[1],
        difficulty: DIFFICULTIES[1],
        numberOfQuestions: 5,
    });
    const [loading, setLoading] = useState(false);

    const handleStartInterview = async () => {
        if (!formData.jobRole) {
            showWarning("Enter a job role to continue");
            return;
        }
        if (!formData.description) {
            showWarning("Enter a description to continue");
            return;
        }

        setLoading(true);
        try {
            const result = await axios.post(
                `${'https://ai-interview-ready-platform.onrender.com/api/ai/create-interview'}`,
                formData,
                { withCredentials: true }
            );
            showSuccess(result?.data?.message || "Interview created");
            navigate('/interview/start', {
                state: {
                    result: result.data,
                    role: formData.jobRole
                }
            });
        } catch (error) {
            showError(error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message || 'Could not start interview')
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="min-w-0 rounded-3xl border border-[#EDE6D4] bg-white p-6 shadow-sm md:p-7 max-[500px]:p-4 max-[350px]:rounded-2xl max-[350px]:p-3">
                <h2 className="text-base font-semibold text-[#292524] mb-1">Start a new interview</h2>
                <p className="text-xs text-[#78716C] mb-6">
                    Pick a role and we'll generate questions tailored to it.
                </p>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-5 max-[350px]:space-y-4">

                    <div>
                        <label htmlFor="jobRole" className="block text-sm font-medium text-[#57534E] mb-1.5">
                            Job Role
                        </label>
                        <div className="flex items-center gap-2 rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/50 px-3.5 py-2.5 focus-within:border-[#0B4D3B] focus-within:ring-2 focus-within:ring-[#0B4D3B]/15 transition-all">
                            <Briefcase size={16} className="text-[#A8A29E] shrink-0" />
                            <input
                                id="jobRole"
                                type="text"
                                value={formData.jobRole}
                                onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                                placeholder="e.g. React Developer"
                                className="w-full bg-transparent text-sm text-[#292524] outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="jobRole" className="block text-sm font-medium text-[#57534E] mb-1.5">
                            Description
                        </label>
                        <div className="flex items-start gap-2 rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/50 px-3.5 py-2.5 focus-within:border-[#0B4D3B] focus-within:ring-2 focus-within:ring-[#0B4D3B]/15 transition-all">
                            <FileText size={16} className="text-[#A8A29E] shrink-0" />
                            <textarea
                                id="description"
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="e.g. I want to crack the internship of a react frontend developer"
                                className="w-full bg-transparent text-sm text-[#292524] outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="experienceLevel" className="block text-sm font-medium text-[#57534E] mb-1.5">
                                Experience
                            </label>
                            <div className="relative">
                                <select
                                    id="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                                    className="w-full appearance-none rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/50 px-3.5 py-2.5 text-sm text-[#292524] outline-none focus:border-[#0B4D3B] focus:ring-2 focus:ring-[#0B4D3B]/15 transition-all cursor-pointer"
                                >
                                    {EXPERIENCE_LEVELS.map((level) => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E] pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="difficulty" className="block text-sm font-medium text-[#57534E] mb-1.5">
                                Difficulty
                            </label>
                            <div className="relative">
                                <select
                                    id="difficulty"
                                    value={formData.difficulty}
                                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                    className="w-full appearance-none rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/50 px-3.5 py-2.5 text-sm text-[#292524] outline-none focus:border-[#0B4D3B] focus:ring-2 focus:ring-[#0B4D3B]/15 transition-all cursor-pointer"
                                >
                                    {DIFFICULTIES.map((level) => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E] pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#57534E] mb-2">
                            Number of Questions
                        </label>
                        <div className="flex gap-2">
                            {QUESTION_COUNTS.map((count) => (
                                <button
                                    key={count}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, numberOfQuestions: count })}
                                    className={`flex-1 text-center py-2 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${formData.numberOfQuestions === count
                                        ? "bg-[#0B4D3B] text-[#F8E7C9] border-[#0B4D3B]"
                                        : "bg-transparent text-[#78716C] border-[#E7E1D3] hover:border-[#0B4D3B]"
                                        }`}
                                >
                                    {count}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        onClick={handleStartInterview}
                        disabled={loading}
                        className="w-full bg-[#C9A24B] text-[#073C2E] px-4 py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-[#E0BB63] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? "Starting..." : "Start Interview"}
                    </button>
                </form>
            </div>



        </>
    )
}

export default CreateInterview
