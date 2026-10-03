import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Briefcase, ChevronDown, ArrowRight, Layers } from "lucide-react";
import { showSuccess, showError } from "../components/ToastMessageBox.jsx";
import Navbar from "../components/Navbar.jsx";
import CreateInterview from "../components/CreateInterview.jsx";


const EXPERIENCE_LEVELS = ["Fresher", "1 - 3 years", "3 - 5 years", "5+ years"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const QUESTION_COUNTS = [5, 10, 15, 20];

const Home = () => {


    return (
        <div className="w-full min-h-screen bg-[#FAF6EF]  ">

            {/* Navbar */}
            <Navbar />

            <div className="w-full h-full flex items-center justify-between">

                {/* left col */}
                <div className="w-[50%] h-screen px-8 py-4">
                    <div className="max-w-160 space-y-7">
                        <div>
                            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6F685F]">
                                stats
                            </h2>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="rounded-3xl border border-[#E9DFC7] bg-linear-to-br from-[#FFFDF9] to-[#F5EFE5] px-5 py-6 text-center shadow-[0_10px_28px_rgba(146,118,72,0.07)]">
                                    <p className="text-[2.2rem] font-bold leading-none text-[#B98B3A]">
                                        12
                                    </p>
                                    <p className="mt-2 text-[0.96rem] text-[#655F59]">Interview Taken</p>
                                </div>
                                <div className="rounded-3xl border border-[#E9DFC7] bg-linear-to-br from-[#FFFDF9] to-[#F5EFE5] px-5 py-6 text-center shadow-[0_10px_28px_rgba(146,118,72,0.07)]">
                                    <p className="text-[2.2rem] font-bold leading-none text-[#B98B3A]">
                                        0
                                    </p>
                                    <p className="mt-2 text-[0.96rem] text-[#655F59]">Avg. Score</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6F685F]">
                                Recent Interview History
                            </h2>
                            <div className="grid grid-cols-3 gap-5">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="group cursor-pointer rounded-3xl border border-[#E9DFC7] bg-linear-to-br from-[#FFFDF9] to-[#F4EBDD] px-5 py-4 text-left shadow-[0_8px_22px_rgba(146,118,72,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(146,118,72,0.12)]"
                                    >
                                        <p className="text-[1.05rem] font-semibold text-[#292524]">Web Dev</p>
                                        <p className="mt-2 text-xs text-[#6F685F]">
                                            Score: {8}/{15} &middot; 12 may
                                        </p>
                                        <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0F5F4A] transition-transform duration-200 group-hover:translate-x-1">
                                            Result
                                            <ArrowRight size={12} />
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6F685F]">
                                Flashcard Revision Reminder
                            </h2>
                            <button
                                // onClick={() => navigate("/revision")}
                                className="flex w-full items-center gap-3 rounded-3xl border border-dashed border-[#E5C980] bg-linear-to-r from-[#FDF8EE] to-[#F5EAD3] px-5 py-5 text-left transition-all duration-200 hover:border-[#C9A24B] hover:shadow-[0_10px_22px_rgba(185,139,58,0.12)]"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E7CE8F] bg-white shadow-sm">
                                    <Layers size={16} className="text-[#C59E3F]" />
                                </span>
                                <span className="text-base font-medium text-[#7A5B27]">
                                    12 flashcards to review
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* right col */}
                <div className="w-[50%] h-screen px-8 py-2">
                    <CreateInterview />
                </div>
            </div>


        </div>
    );
};

export default Home;



