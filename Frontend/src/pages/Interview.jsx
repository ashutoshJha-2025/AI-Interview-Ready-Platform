import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import api from '../api.js'
import { CheckCircle2 } from 'lucide-react'
import { showError, showSuccess } from '../components/ToastMessageBox.jsx'

const Interview = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const result = location.state?.result ?? {};
    const role = location.state?.role || 'Interview';
    const interviewId = result?.interviewId || location.state?.interviewId || result?._id;

    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (id, value) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const answeredCount = result?.questions?.filter((question) => answers[question.order]?.trim()).length ?? 0;
    const allAnswered = (result?.questions?.length ?? 0) > 0 && answeredCount === result?.questions?.length;
    const remaining = (result?.questions?.length ?? 0) - answeredCount;

    async function handleSubmit() {
        if (!result?.questions?.length) {
            showError('No questions available to submit.');
            return;
        }

        const questions = result.questions.map((question) => ({
            ...question,
            userAnswer: answers[question.order] ?? '',
        }));

        try {
            setLoading(true)
            const response = await api.patch(
                '/api/ai/userAnswer',
                { interviewId, questions },
            )

            showSuccess(response?.data?.message || 'Answers saved successfully')
            navigate('/interview/answers', {
                state: {
                    interviewId,
                    formData: {
                        data: questions,
                    },
                }
            })
        } catch (error) {
            showError(error.response?.data?.message || error.message || 'Could not save answers')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="w-full min-h-screen bg-[#FAF6EF] px-4 md:px-6 py-10">
                <form onSubmit={(e) => e.preventDefault()} className="max-w-3xl mx-auto space-y-4">

                    {/* Header */}
                    <div className="bg-white rounded-2xl border border-[#EDE6D4] shadow-sm overflow-hidden ">
                        <div className="h-2 bg-[#0B4D3B]" />
                        <div className="px-6 md:px-8 py-6">
                            <h1 className="text-xl font-bold text-[#292524] mb-1">{role} Interview</h1>
                            <p className="text-sm text-[#78716C]">
                                Answer each question to the best of your ability. All questions are required.
                            </p>

                            <div className="flex items-center gap-2.5 mt-4">
                                <div className="flex-1 h-1.5 bg-[#EDE6D4] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#C9A24B] transition-all duration-300"
                                        style={{ width: `${((result?.questions?.length ?? 0) === 0) ? 0 : (answeredCount / (result.questions.length)) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs font-medium text-[#78716C] whitespace-nowrap">
                                    {answeredCount} / {result?.questions?.length ?? 0} answered
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Questions */}
                    {result?.questions?.map((question, index) => {
                        const isAnswered = Boolean(answers[question.order]?.trim());
                        return (
                            <div
                                key={question.order}
                                className={`bg-white rounded-2xl border p-6 md:p-7 transition-colors ${isAnswered ? "border-[#C9E4D3]" : "border-[#EDE6D4]"}`}

                            >
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <label
                                        htmlFor={`question-${question.order}`}
                                        className="text-[15px] font-medium text-[#292524] leading-6"
                                    >
                                        <span className="text-[#78716C] mr-1.5">{index + 1}.</span>
                                        {question.question}
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    {isAnswered && (
                                        <CheckCircle2 size={18} className="text-[#0B4D3B] shrink-0 mt-0.5" />
                                    )}
                                </div>

                                <textarea
                                    id={`question-${question.order}`}
                                    name={`question-${question.order}`}
                                    rows={4}
                                    value={answers[question.order] || ""}
                                    onChange={(e) => handleChange(question.order, e.target.value)}
                                    placeholder="Write your answer..."
                                    className="w-full resize-none rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/40 px-4 py-3 text-sm text-[#292524] outline-none placeholder:text-[#A8A29E] focus:border-[#0B4D3B] focus:ring-2 focus:ring-[#0B4D3B]/15 transition-all"
                                />
                            </div>
                        );
                    })}

                    {/* Submit footer */}
                    <div className="bg-white rounded-2xl border border-[#ddd7c9] p-5 flex items-center justify-between gap-4 bottom-4 shadow-lg shadow-[#0B4D3B]/5 sticky">
                        <p className="text-xs text-[#78716C]">
                            {allAnswered
                                ? "All questions answered — ready to submit."
                                : `${remaining} question${remaining === 1 ? "" : "s"} left to answer.`}
                        </p>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="shrink-0 rounded-xl bg-[#0B4D3B] px-6 py-3 text-sm font-semibold text-[#F8E7C9] hover:bg-[#073C2E] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                        >
                            {loading ? 'Saving...' : 'Submit Answers'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Interview
