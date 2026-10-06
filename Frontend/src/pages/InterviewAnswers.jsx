import { Link, useLocation } from "react-router-dom";
import axios from 'axios'
import { useState } from 'react'
import { BookMarked, Sparkles, Home } from 'lucide-react'
import { showError, showSuccess } from '../components/ToastMessageBox.jsx'

const InterviewAnswers = () => {
    const location = useLocation();
    const interviewId = location.state?.interviewId;
    const [data, setData] = useState(location.state?.formData?.data ?? []);
    const [evaluation, setEvaluation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [displayHome, setDisplayHome] = useState(false)

    const handleEvaluate = async () => {
        if (!interviewId) {
            showError('Interview session is missing. Please start again.');
            return;
        }

        try {
            setLoading(true)
            const response = await axios.post(
                'http://localhost:3000/api/ai/evaluate',
                { interviewId, questions: data },
                { withCredentials: true }
            )

            setEvaluation({
                overallScore: response.data?.overallScore ?? 0,
                strengths: response.data?.strengths ?? [],
                improvements: response.data?.improvements ?? [],
            })
            showSuccess(response?.data?.message || 'Evaluation completed successfully')
            setDisplayHome(true)
        } catch (error) {
            showError(error.response?.data?.message || error.message || 'Could not evaluate interview')
        } finally {
            setLoading(false)
        }
    }

    const handleBookmark = async (question) => {
        if (!interviewId || !question?.order) {
            showError('Question cannot be bookmarked without an interview.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/api/ai/bookmark-question',
                { interviewId, questionOrder: question.order },
                { withCredentials: true }
            )
            showSuccess(response?.data?.message || 'Question added to revision list')
        } catch (error) {
            showError(error.response?.data?.message || error.message || 'Could not save bookmark')
        }
    }

    return (
        <>
            <div className="min-h-screen w-full bg-[#FAF6EF] px-4 py-8 md:px-8">
                <div className="mx-auto max-w-6xl space-y-6">
                    <div className="rounded-3xl border border-[#EDE6D4] bg-white p-5 shadow-sm">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#6F685F]">Interview review</p>
                                <h1 className="mt-2 text-2xl font-bold text-[#292524]">Answer comparison</h1>
                            </div>

                            {displayHome == true ? (
                                <>
                                    <Link
                                        to='/home'
                                        className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-[#0B4D3B] px-5 py-3 text-sm font-semibold text-[#F8E7C9] hover:bg-[#073C2E] disabled:opacity-50"
                                    >
                                        <Home size={16} className="mr-2" />
                                        Evaluation Completded, Return to Dashboard
                                    </Link>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleEvaluate}
                                    disabled={loading}
                                    className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-[#0B4D3B] px-5 py-3 text-sm font-semibold text-[#F8E7C9] hover:bg-[#073C2E] disabled:opacity-50"
                                >
                                    <Sparkles size={16} className="mr-2" />
                                    {loading ? 'Evaluating...' : 'Evaluate Answers'}
                                </button>
                            )}
                        </div>
                    </div>

                    {evaluation && (
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-3xl border border-[#E9DFC7] bg-[#FFFDF9] p-5">
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6F685F]">Overall score</p>
                                <p className="mt-3 text-3xl font-bold text-[#0B4D3B]">{evaluation.overallScore}</p>
                            </div>
                            <div className="rounded-3xl border border-[#E9DFC7] bg-[#FFFDF9] p-5 md:col-span-2">
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6F685F]">Strengths</p>
                                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#292524]">
                                    {evaluation.strengths.map((item, index) => (
                                        <li key={`${item}-${index}`}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-3xl border border-[#E9DFC7] bg-[#FFFDF9] p-5 md:col-span-3">
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6F685F]">Improvements</p>
                                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#292524]">
                                    {evaluation.improvements.map((item, index) => (
                                        <li key={`${item}-${index}`}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="w-full overflow-hidden rounded-3xl border border-[#EDE6D4] bg-white shadow-sm">
                        <table className="w-full border-collapse">
                            <thead className="bg-[#1E1B1B] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Questions</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Your Answer</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Ideal Answer</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {data.map((question, index) => (
                                    <tr key={question.order ?? index} className="align-top text-sm text-[#292524]">
                                        <td className="px-6 py-5 font-medium text-gray-800 align-top">
                                            {question.question}
                                        </td>

                                        <td className="px-6 py-5 text-gray-600 align-top whitespace-pre-wrap">
                                            {question.userAnswer || 'No answer provided'}
                                        </td>

                                        <td className="px-6 py-5 text-gray-600 align-top whitespace-pre-wrap">
                                            {question.idealAnswer}
                                        </td>

                                        <td className="px-6 py-5 align-top">
                                            <button
                                                type="button"
                                                onClick={() => handleBookmark(question)}
                                                className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-[#E9DFC7] bg-[#FAF6EF] px-3 py-2 text-xs font-medium text-[#0F5F4A] hover:bg-[#F4EBDD]"
                                            >
                                                <BookMarked size={14} />
                                                Save
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InterviewAnswers
