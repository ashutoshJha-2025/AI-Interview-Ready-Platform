import { useEffect, useState } from 'react'
import api from '../api.js'
import { BookOpenCheck, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'

const Revision = () => {
    const [revisionList, setRevisionList] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchRevision = async () => {
        try {
            const response = await api.get('/api/ai/revision')
            setRevisionList(response.data?.revision ?? [])
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRevision()
    }, [])

    return (
        <>
            <Navbar />
            <div className="min-h-screen w-full bg-[#FAF6EF] px-4 py-8 md:px-10">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-6 flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6F685F]">
                                Revision
                            </p>
                            <h1 className="mt-2 text-2xl font-bold text-[#292524]">Bookmarked questions</h1>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-[#E9DFC7] bg-white px-3 py-2 text-sm font-medium text-[#0B4D3B]">
                            <BookOpenCheck size={16} />
                            {revisionList.length} items
                        </div>
                    </div>

                    {loading ? (
                        <div className="rounded-3xl border border-[#EDE6D4] bg-white p-6 text-sm text-[#57534E]">
                            Loading revision list...
                        </div>
                    ) : revisionList.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-[#E9DFC7] bg-white p-8 text-center text-[#57534E]">
                            No bookmarked questions yet. Save a question from the result page to start revising.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {revisionList.map((item) => (
                                <div key={`${item.interviewId}-${item.questionOrder}`} className="rounded-3xl border border-[#EDE6D4] bg-white p-5 shadow-sm">
                                    <div className="mb-3 flex items-center justify-between gap-2">
                                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#78716C]">
                                            Question {item.questionOrder}
                                        </p>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-[#F4EBDD] px-2.5 py-1 text-[11px] font-medium text-[#7A5B27]">
                                            Saved
                                            <ArrowUpRight size={12} />
                                        </span>
                                    </div>

                                    <h2 className="text-lg font-semibold text-[#292524]">{item.question}</h2>

                                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                                        <div className="rounded-2xl bg-[#FAF6EF] p-3">
                                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#6F685F]">
                                                Your answer
                                            </p>
                                            <p className="text-sm text-[#292524] whitespace-pre-wrap">
                                                {item.userAnswer || 'No answer provided'}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-[#F4EBDD] p-3">
                                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#6F685F]">
                                                Ideal answer
                                            </p>
                                            <p className="text-sm text-[#292524] whitespace-pre-wrap">
                                                {item.idealAnswer || 'No ideal answer provided'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Revision
