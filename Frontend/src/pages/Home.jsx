import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { ArrowRight, Layers } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import CreateInterview from "../components/CreateInterview.jsx";
import { showError } from "../components/ToastMessageBox.jsx";

const formatDate = (timestamp) => {
    if (!timestamp) return "Date unavailable";

    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
    }).format(date);
};

const Home = () => {
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState({
        stats: { interviewCount: 0, averageScore: 0, flashcardCount: 0 },
        recentInterviews: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get("/api/ai/home-dashboard");
                setDashboard({
                    stats: response.data?.stats ?? { interviewCount: 0, averageScore: 0, flashcardCount: 0 },
                    recentInterviews: response.data?.recentInterviews ?? [],
                });
            } catch (error) {
                showError(error.response?.data?.message || error.message || "Could not load dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    return (
        <div className="min-h-screen w-full bg-[#FAF6EF]">

            {/* Navbar */}
            <Navbar />

            <main className="mx-auto grid w-full max-w-8xl grid-cols-1 items-start gap-6 px-8 py-6 max-sm:gap-5 max-sm:px-4 max-[500px]:px-3 max-[400px]:px-3 max-[350px]:gap-4 max-[350px]:px-2 lg:grid-cols-2 lg:gap-8">

                {/* left col */}
                <section className="min-w-0">
                    <div className="w-full space-y-7 max-[400px]:space-y-5">
                        <div>
                            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6F685F]">
                                stats
                            </h2>
                            <div className="grid grid-cols-2 gap-5 max-sm:gap-3 max-[350px]:gap-2">
                                <div className="min-w-0 rounded-3xl border border-[#E9DFC7] bg-linear-to-br from-[#FFFDF9] to-[#F5EFE5] px-5 py-6 text-center shadow-[0_10px_28px_rgba(146,118,72,0.07)] max-sm:px-3 max-sm:py-5 max-[350px]:rounded-2xl max-[350px]:px-2 max-[350px]:py-4">
                                    <p className="text-[2.2rem] font-bold leading-none text-[#B98B3A] max-sm:text-[2rem] max-[400px]:text-[1.75rem] max-[350px]:text-[1.55rem]">
                                        {loading ? "..." : dashboard.stats.interviewCount}
                                    </p>
                                    <p className="mt-2 text-[0.96rem] text-[#655F59] max-sm:text-sm max-[350px]:text-xs">Interview Taken</p>
                                </div>
                                <div className="min-w-0 rounded-3xl border border-[#E9DFC7] bg-linear-to-br from-[#FFFDF9] to-[#F5EFE5] px-5 py-6 text-center shadow-[0_10px_28px_rgba(146,118,72,0.07)] max-sm:px-3 max-sm:py-5 max-[350px]:rounded-2xl max-[350px]:px-2 max-[350px]:py-4">
                                    <p className="text-[2.2rem] font-bold leading-none text-[#B98B3A] max-sm:text-[2rem] max-[400px]:text-[1.75rem] max-[350px]:text-[1.55rem]">
                                        {loading ? "..." : dashboard.stats.averageScore}
                                    </p>
                                    <p className="mt-2 text-[0.96rem] text-[#655F59] max-sm:text-sm max-[350px]:text-xs">Avg. Score</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6F685F]">
                                Recent Interview History
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 max-[350px]:gap-3">
                                {dashboard.recentInterviews.map((interview) => (
                                    <button
                                        type="button"
                                        key={interview._id}
                                        onClick={() => navigate(`/interview/result/${interview._id}`)}
                                        className="group min-w-0 rounded-3xl border border-[#E9DFC7] bg-linear-to-br from-[#FFFDF9] to-[#F4EBDD] px-5 py-4 text-left shadow-[0_8px_22px_rgba(146,118,72,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(146,118,72,0.12)] max-sm:px-4 max-[350px]:rounded-2xl max-[350px]:px-3"
                                    >
                                        <span className="block truncate text-[1.05rem] font-semibold text-[#292524]">
                                            {interview.jobRole || "Interview"}
                                        </span>
                                        <span className="mt-2 block text-xs text-[#6F685F]">
                                            {interview.status === "completed"
                                                ? `Score: ${interview.overallScore ?? 0}/100`
                                                : "Not evaluated"}{" "}
                                            &middot; {formatDate(interview.createdAt)}
                                        </span>
                                        <span className="mt-4 cursor-pointer inline-flex items-center gap-1 text-sm font-medium text-[#0F5F4A] transition-transform duration-200 group-hover:translate-x-1">
                                            Result
                                            <ArrowRight size={12} />
                                        </span>
                                    </button>
                                ))}
                                {!loading && dashboard.recentInterviews.length === 0 && (
                                    <p className="col-span-full rounded-3xl border border-dashed border-[#E9DFC7] bg-white px-5 py-6 text-sm text-[#6F685F]">
                                        No interviews yet. Start your first practice interview to see it here.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6F685F]">
                                Flashcard Revision Reminder
                            </h2>
                            <button
                                type="button"
                                onClick={() => navigate("/interview/review")}
                                className="flex w-full items-center gap-3 rounded-3xl border border-dashed border-[#E5C980] bg-linear-to-r from-[#FDF8EE] to-[#F5EAD3] px-5 py-5 text-left transition-all duration-200 hover:border-[#C9A24B] hover:shadow-[0_10px_22px_rgba(185,139,58,0.12)] max-sm:gap-2 max-sm:px-4 max-sm:py-4 max-[350px]:rounded-2xl max-[350px]:px-3"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E7CE8F] bg-white shadow-sm">
                                    <Layers size={16} className="text-[#C59E3F]" />
                                </span>
                                <span className="min-w-0 text-base font-medium text-[#7A5B27] max-[350px]:text-sm">
                                    {loading ? "Loading flashcards..." : `${dashboard.stats.flashcardCount} flashcards to review`}
                                </span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* right col */}
                <section className="min-w-0">
                    <CreateInterview />
                </section>
            </main>
        </div>
    );
};

export default Home;
