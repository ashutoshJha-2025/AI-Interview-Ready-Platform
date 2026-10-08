import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { CalendarDays, ClipboardList, RotateCw, Search, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { showError } from "../components/ToastMessageBox.jsx";

const formatDate = (timestamp) => {
    if (!timestamp) return "Date unavailable";

    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
};

const History = () => {
    const [interviews, setInterviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchInterviews = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get("http://localhost:3000/api/ai/getAllInterview", {
                withCredentials: true,
            });
            setInterviews(response.data?.interviews ?? []);
        } catch (requestError) {
            const message = requestError.response?.data?.message || requestError.message || "Could not load interview history";
            setError(message);
            showError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterviews();
    }, []);

    const filteredInterviews = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return interviews;

        return interviews.filter((interview) =>
            [interview.jobRole, interview.description, interview.status, interview.difficulty]
                .some((value) => String(value ?? "").toLowerCase().includes(query))
        );
    }, [interviews, searchTerm]);

    return (
        <div className="min-h-screen w-full bg-[#FAF6EF]">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
                <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6F685F]">
                            Your progress
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-[#292524]">Interview history</h1>
                        <p className="mt-2 text-sm text-[#78716C]">
                            Review your previous practice sessions and scores.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <label className="flex min-w-64 items-center gap-2 rounded-xl border border-[#E9DFC7] bg-white px-3.5 py-2.5 focus-within:border-[#0B4D3B] focus-within:ring-2 focus-within:ring-[#0B4D3B]/10">
                            <Search size={16} className="shrink-0 text-[#A8A29E]" />
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search interviews"
                                aria-label="Search interviews"
                                className="w-full bg-transparent text-sm text-[#292524] outline-none placeholder:text-[#A8A29E]"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={fetchInterviews}
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E9DFC7] bg-white px-4 py-2.5 text-sm font-medium text-[#57534E] transition-colors hover:bg-[#FFFDF9] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <RotateCw size={15} className={loading ? "animate-spin" : ""} />
                            Refresh
                        </button>
                    </div>
                </div>

                <div className="mb-5 flex items-center gap-2 text-sm text-[#6F685F]">
                    <ClipboardList size={17} className="text-[#0B4D3B]" />
                    <span>
                        {loading ? "Loading sessions..." : `${filteredInterviews.length} session${filteredInterviews.length === 1 ? "" : "s"}`}
                    </span>
                </div>

                {loading ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="h-44 animate-pulse rounded-3xl border border-[#EDE6D4] bg-white" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="rounded-3xl border border-[#EDE6D4] bg-white p-8 text-center">
                        <p className="font-semibold text-[#292524]">We couldn&apos;t load your history.</p>
                        <p className="mt-2 text-sm text-[#78716C]">{error}</p>
                        <button
                            type="button"
                            onClick={fetchInterviews}
                            className="mt-5 rounded-xl bg-[#0B4D3B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#073C2E]"
                        >
                            Try again
                        </button>
                    </div>
                ) : filteredInterviews.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-[#E9DFC7] bg-white px-6 py-14 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F4EBDD] text-[#9A7835]">
                            <ClipboardList size={21} />
                        </div>
                        <h2 className="mt-4 text-lg font-semibold text-[#292524]">
                            {interviews.length ? "No matching interviews" : "No interviews yet"}
                        </h2>
                        <p className="mx-auto mt-2 max-w-md text-sm text-[#78716C]">
                            {interviews.length
                                ? "Try a different search term."
                                : "Start a practice interview and your completed sessions will appear here."}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 max-[400px]:grid-cols-1">
                        {filteredInterviews.map((interview) => {
                            const completed = interview.status === "completed";

                            return (
                                <article
                                    key={interview._id}
                                    className="rounded-3xl border border-[#EDE6D4] bg-white p-5 shadow-[0_8px_22px_rgba(146,118,72,0.05)] transition-shadow hover:shadow-[0_12px_26px_rgba(146,118,72,0.1)] md:p-6"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A806F]">
                                                {interview.experienceLevel || "Practice interview"}
                                            </p>
                                            <h2 className="mt-1 truncate text-xl font-semibold text-[#292524]">
                                                {interview.jobRole || "Interview"}
                                            </h2>
                                        </div>
                                        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                            completed ? "bg-[#E8F3EB] text-[#0B4D3B]" : "bg-[#F4EBDD] text-[#7A5B27]"
                                        }`}>
                                            {String(interview.status || "created").replace("_", " ")}
                                        </span>
                                    </div>

                                    {interview.description && (
                                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6F685F]">
                                            {interview.description}
                                        </p>
                                    )}

                                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#F0EBE2] pt-4 text-sm text-[#6F685F]">
                                        <span className="inline-flex items-center gap-1.5">
                                            <CalendarDays size={15} className="text-[#A18448]" />
                                            {formatDate(interview.createdAt)}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <Sparkles size={15} className="text-[#A18448]" />
                                            {completed ? `Score: ${interview.overallScore ?? 0}/100` : "Not evaluated"}
                                        </span>
                                        <span>
                                            {interview.questions?.length ?? interview.numberOfQuestions ?? 0} questions
                                        </span>
                                        {interview.difficulty && <span>{interview.difficulty}</span>}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default History;
