import { Lottie } from "lottie-react";
import { Mail, MapPin, Star, Pencil, Upload, Plus } from "lucide-react";
import userIconAnimation from '../assets/wired-lineal-21-avatar-hover-looking-around.json'
import { useEffect, useRef } from "react";

const Profile = () => {
    const lottieRef = useRef();

    useEffect(() => {
        lottieRef.current?.play();
    }, []);

    const handleClick = () => {
        lottieRef.current?.stop();
        lottieRef.current?.play();
    };


    return (
        <div id="profile-page" className="w-full min-h-screen bg-[#FAF6EF]">

            {/* Header */}
            <div className="w-full sticky top-0 z-30 backdrop-blur-md bg-white/90 border-b border-[#EDE6D4] px-6 md:px-12 py-3.5 shadow-sm flex items-center justify-between">
                <span className="text-[#57534E] font-medium text-sm">
                    Profile updated at: <span className="text-[#292524] font-semibold">27 August 2026</span>
                </span>

                <button className="px-4 py-2 cursor-pointer rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors">
                    Sign Out
                </button>
            </div>

            {/* Main content */}
            <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-6 px-6 md:px-12 py-8">

                {/* Profile card */}
                <div className="w-full lg:w-80 shrink-0 bg-linear-to-br from-[#0B4D3B] to-[#073C2E] rounded-3xl flex flex-col items-center py-6 px-6 shadow-lg shadow-[#0B4D3B]/15 transition-shadow hover:shadow-xl hover:shadow-[#0B4D3B]/20">

                    <div className="w-full flex justify-end -mb-2">
                        <span className="text-[#073C2E] bg-[#C9A24B] font-semibold text-[11px] tracking-wide px-3 py-1 rounded-full">
                            WEB DEV
                        </span>
                    </div>

                    <div className="w-22 h-22 my-4 rounded-full border-2 border-[#C9A24B] bg-[#F8E7C9]/10 flex items-center justify-center">
                        <Lottie
                            lottieRef={lottieRef}
                            onClick={handleClick}
                            src={userIconAnimation}
                            loop={false}
                            autoplay={true}
                            style={{ width: "80%", height: "80%", cursor: "pointer" }}
                        />
                    </div>

                    <span className="text-[#F8E7C9] text-lg font-semibold">Ashutosh Jha</span>
                    <span className="text-[#F8E7C9]/65 text-sm mb-4">@ashutoshJha-2025</span>

                    <div className="w-full border-t border-dashed border-[#F8E7C9]/25 mb-4" />

                    <div className="w-full flex flex-col gap-3 mb-5 text-[#F8E7C9] text-sm">
                        <div className="flex items-center gap-2.5">
                            <MapPin size={16} className="text-[#C9A24B]" />
                            <span>Mumbai, Maharashtra</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Mail size={16} className="text-[#C9A24B]" />
                            <span className="truncate">jhaashutosh0811@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Star size={16} className="text-[#C9A24B]" />
                            <span>Avg. Score: <strong>9.5</strong></span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 text-[#073C2E] bg-[#C9A24B] text-sm font-semibold rounded-xl px-6 py-2.5 cursor-pointer transition-all hover:bg-[#E0BB63] hover:-translate-y-0.5"
                    >
                        <Pencil size={16} />
                        Edit Details
                    </button>
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
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti in, eum corporis iusto
                                possimus laborum blanditiis cum mollitia eligendi ad eaque, sequi voluptatum.
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
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#FBF3E0] text-[#8A6A2C] text-sm font-medium border border-[#EFDDAF] transition-colors hover:bg-[#0B4D3B] hover:text-[#F8E7C9] cursor-default">
                                    Java
                                </span>
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#FBF3E0] text-[#8A6A2C] text-sm font-medium border border-[#EFDDAF] transition-colors hover:bg-[#0B4D3B] hover:text-[#F8E7C9] cursor-default">
                                    React
                                </span>
                            </div>
                        </div>

                        <label className="bg-white rounded-2xl border border-dashed border-[#D6D3D1] shadow-sm hover:border-[#C9A24B] hover:bg-[#FBF6E9] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2 px-6 py-6 text-center">
                            <Upload size={22} className="text-[#A8A29E]" />
                            <span className="text-sm font-medium text-[#78716C]">Upload Resume</span>
                            <input type="file" accept=".pdf" className="hidden" />
                        </label>
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