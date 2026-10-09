import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Home } from "lucide-react";
import { showError } from "../components/ToastMessageBox.jsx";

const InterviewResult = () => {
    const { interviewId } = useParams();
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        const fetchInterviewResult = async () => {
            try {
                const response = await axios.get(
                    `https://ai-interview-ready-platform.onrender.com/api/ai/interview/${interviewId}/result`,
                    { withCredentials: true }
                );
                if (active) {
                    setInterview(response.data?.interview ?? null);
                }
            } catch (error) {
                if (active) {
                    showError(error.response?.data?.message || error.message || "Could not load interview result");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchInterviewResult();
        return () => {
            active = false;
        };
    }, [interviewId]);

    const questions = interview?.questions ?? [];

    return (
        <div className="min-h-screen w-full bg-[#FAF6EF] px-4 py-8 md:px-8">
            <div className="mx-auto max-w-6xl space-y-6">
                <div className="rounded-3xl border border-[#EDE6D4] bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#6F685F]">Interview review</p>
                            <h1 className="mt-2 text-2xl font-bold text-[#292524]">
                                {interview?.jobRole ? `${interview.jobRole} interview result` : "Answer comparison"}
                            </h1>
                        </div>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center justify-center rounded-xl bg-[#0B4D3B] px-5 py-3 text-sm font-semibold text-[#F8E7C9] hover:bg-[#073C2E]"
                        >
                            <Home size={16} className="mr-2" />
                            Return to Dashboard
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <p className="rounded-3xl border border-[#E9DFC7] bg-white px-5 py-6 text-sm text-[#6F685F]">
                        Loading interview result...
                    </p>
                ) : interview ? (
                    <>
                        {interview.status === "completed" && (
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="rounded-3xl border border-[#E9DFC7] bg-[#FFFDF9] p-5">
                                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6F685F]">Overall score</p>
                                    <p className="mt-3 text-3xl font-bold text-[#0B4D3B]">{interview.overallScore ?? 0}</p>
                                </div>
                                <div className="rounded-3xl border border-[#E9DFC7] bg-[#FFFDF9] p-5 md:col-span-2">
                                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6F685F]">Strengths</p>
                                    {interview.strengths?.length ? (
                                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#292524]">
                                            {interview.strengths.map((item, index) => (
                                                <li key={`${item}-${index}`}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : <p className="mt-3 text-sm text-[#6F685F]">No strengths recorded.</p>}
                                </div>
                                <div className="rounded-3xl border border-[#E9DFC7] bg-[#FFFDF9] p-5 md:col-span-3">
                                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6F685F]">Improvements</p>
                                    {interview.improvements?.length ? (
                                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#292524]">
                                            {interview.improvements.map((item, index) => (
                                                <li key={`${item}-${index}`}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : <p className="mt-3 text-sm text-[#6F685F]">No improvements recorded.</p>}
                                </div>
                            </div>
                        )}

                        <div className="w-full overflow-x-auto rounded-3xl border border-[#EDE6D4] bg-white shadow-sm">
                            <table className="w-full min-w-[640px] border-collapse">
                                <thead className="bg-[#1E1B1B] text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Questions</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Your Answer</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Ideal Answer</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {questions.map((question, index) => (
                                        <tr key={question.order ?? index} className="align-top text-sm text-[#292524]">
                                            <td className="px-6 py-5 font-medium text-gray-800">{question.question}</td>
                                            <td className="whitespace-pre-wrap px-6 py-5 text-gray-600">
                                                {question.userAnswer || "No answer provided"}
                                            </td>
                                            <td className="whitespace-pre-wrap px-6 py-5 text-gray-600">
                                                {question.idealAnswer || "No ideal answer available"}
                                            </td>
                                        </tr>
                                    ))}
                                    {!questions.length && (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-8 text-center text-sm text-[#6F685F]">
                                                No interview questions are available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <p className="rounded-3xl border border-[#E9DFC7] bg-white px-5 py-6 text-sm text-[#6F685F]">
                        This interview result is unavailable.
                    </p>
                )}
            </div>
        </div>
    );
};

export default InterviewResult;
