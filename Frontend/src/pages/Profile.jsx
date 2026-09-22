import { Link } from "react-router-dom"
import ProfileCard from "../components/ProfileCard.jsx";
import { Plus, MailWarning } from "lucide-react";
import axios from 'axios';
import { showSuccess, showError } from '../components/ToastMessageBox.jsx'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Profile = () => {
    const [data, setData] = useState()
    const navigate = useNavigate()

    async function getMe() {
        try {
            const response = await axios.get(`http://localhost:3000/api/profile/get-me`, { withCredentials: true })
            setData(response?.data)
            console.log(response?.data)
        } catch (error) {
            console.log(error.response?.data?.message || error.response?.data?.errors[0]?.msg || error.message || 'Invalid credentials')
        }
    }

    useEffect(() => {
        getMe()
    }, [])
    async function logout() {
        try {
            const response = await axios.post(`http://localhost:3000/api/auth-user/logout`, {}, { withCredentials: true })
            showSuccess('Logged out successfully')
            navigate('/')
        } catch (error) {
            showError(error.response?.data?.message || error.response?.data?.errors[0]?.msg || error.message || 'Unauthorized user, login / register to continue !')
        }
    }

    const date = data?.profileDetails?.updatedAt ? new Date(data.profileDetails.updatedAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }) : '';


    return (
        <div id="profile-page" className="w-full min-h-screen bg-[#FAF6EF]">

            {/* Header */}
            <div className="w-full sticky top-0 z-30 backdrop-blur-md bg-white/90 border-b border-[#EDE6D4] px-6 md:px-12 py-3.5 shadow-sm flex items-center justify-between">
                <span className="text-[#57534E] font-medium text-sm">
                    Profile updated at: <span className="text-[#292524] font-semibold">{date}</span>
                </span>

                <div className="flex items-center gap-2 border border-gray-200 rounded-full px-2.5 py-1.5">
                    <MailWarning size={20} className="text-[#C9A24B] shrink-0" />
                    <Link to="/email-verifiied" className="text-sm font-semibold text-[#292524]">Verify your email</Link>
                </div>

                <button
                    onClick={() => logout()}
                    className="px-4 py-2 cursor-pointer rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors">
                    Sign Out
                </button>
            </div>

            {/* Main content */}
            <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-6 px-6 md:px-12 py-8">

                {/* Left column: profile card + verification card */}
                <div className="w-full lg:w-80 shrink-0 flex flex-col gap-5">

                    {/* Profile card */}
                    <ProfileCard data={data} />
                </div>

                {/* Right column */}
                <div className="w-full lg:flex-1 flex flex-col gap-5">

                    {/* About Me */}
                    <div className="bg-white rounded-2xl border border-[#EDE6D4] shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="px-6 py-4 border-b border-[#EDE6D4]">
                            <h2 className="text-xs font-bold text-[#78716C] uppercase tracking-widest">About Me</h2>
                        </div>
                        <div className="px-6 py-4">
                            <p className="text-sm text-[#57534E] leading-relaxed">
                                {data?.profileDetails?.description || null}
                            </p>
                        </div>
                    </div>

                    {/* Skills + Upload Resume */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        <div className="bg-white rounded-2xl border border-[#EDE6D4] shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="px-6 py-4 border-b border-[#EDE6D4]">
                                <h2 className="text-xs font-bold text-[#78716C] uppercase tracking-widest">Skills</h2>
                            </div>
                            <div className="px-6 py-4 flex flex-wrap gap-2">
                                {(data?.profileDetails?.skills || []).map((skill) => (
                                    <span key={skill} className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#FBF3E0] text-[#8A6A2C] text-sm font-medium border border-[#EFDDAF] transition-colors hover:bg-[#0B4D3B] hover:text-[#F8E7C9] cursor-default">
                                        {skill}
                                    </span>
                                ))}

                                {(!data?.profileDetails?.skills || data?.profileDetails?.skills.length === 0) && <p className="text-sm text-slate-400">No skills added yet.</p>}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-[#EDE6D4] shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="px-6 py-4 border-b border-[#EDE6D4]">
                                <h2 className="text-xs font-bold text-[#78716C] uppercase tracking-widest">Resume</h2>
                            </div>
                            <a
                                href={data?.profileDetails?.resumeUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-4 flex flex-wrap gap-2 text-md text-blue-600 hover:underline"
                            >
                                {data?.profileDetails?.resumeUrl ? 'View Resume' : 'No resume added yet'}
                            </a>
                        </div>
                    </div>

                    {/* Previous Interviews */}
                    <div>
                        <h2 className="text-xs font-bold text-[#78716C] uppercase tracking-widest mb-3">
                            Previous Interviews
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <button className="bg-white rounded-2xl border border-[#EDE6D4] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 px-4 py-5 text-center cursor-pointer">
                                <p className="text-sm font-semibold text-[#292524]">Reactjs</p>
                                <p className="text-xs text-[#A8A29E] mt-1">Score: 9.2</p>
                            </button>
                            <button className="bg-white rounded-2xl border border-[#EDE6D4] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 px-4 py-5 text-center cursor-pointer">
                                <p className="text-sm font-semibold text-[#292524]">Java</p>
                                <p className="text-xs text-[#A8A29E] mt-1">Score: 9.8</p>
                            </button>
                            <button className="bg-[#FBF6E9] rounded-2xl border border-dashed border-[#E7CE8F] hover:border-[#C9A24B] hover:-translate-y-0.5 transition-all duration-200 px-4 py-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer">
                                <span className="w-7 h-7 rounded-full border border-[#C9A24B] flex items-center justify-center">
                                    <Plus size={14} className="text-[#C9A24B]" />
                                </span>
                                <p className="text-xs font-medium text-[#8A6A2C]">Create New</p>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile