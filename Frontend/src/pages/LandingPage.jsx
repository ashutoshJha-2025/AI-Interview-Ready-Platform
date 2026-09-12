import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, BarChart3, Layers, ArrowRight } from "lucide-react";

const SAMPLE_ANSWER =
    "Redux is a predictable global store for complex app state, while Context API is a built-in React feature for passing data through the tree without prop drilling.";

function useTypewriter(text, { speed = 25 } = {}) {
    const [displayed, setDisplayed] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let i = 0;
        let timeoutId;

        const tick = () => {
            if (i <= text.length) {
                setDisplayed(text.slice(0, i));
                i += 1;
                timeoutId = setTimeout(tick, speed);
            }
        };

        tick();
        return () => clearTimeout(timeoutId);
    }, [text, speed]);

    useEffect(() => {
        const cursorInterval = setInterval(() => setShowCursor((c) => !c), 500);
        return () => clearInterval(cursorInterval);
    }, []);

    return { text: displayed, cursor: showCursor };
}

const LandingPage = () => {
    const answer = useTypewriter(SAMPLE_ANSWER);

    return (
        <div className="w-full min-h-screen bg-[#FAF6EF]">

            <nav className="w-full sticky top-0 z-30 backdrop-blur-md bg-white/90 border-b border-[#EDE6D4] px-6 md:px-12 py-4 flex items-center justify-between">
                <span className="text-xl font-bold text-[#073C2E]">
                    Interview<span className="text-[#C9A24B]">Ready</span>
                </span>

                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="px-4 py-2 rounded-xl text-sm font-medium text-[#0B4D3B] border border-[#0B4D3B] hover:bg-[#0B4D3B] hover:text-[#F8E7C9] transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-4 py-2 rounded-xl text-sm font-semibold text-[#073C2E] bg-[#C9A24B] hover:bg-[#E0BB63] transition-colors"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            <section className="w-full flex flex-col lg:flex-row items-center gap-15 px-6 md:px-12 py-14 lg:py-10">
                <div className="flex-1 max-w-xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#292524] leading-tight mb-4">
                        Ace every interview with AI on your side
                    </h1>
                    <p className="text-[#57534E] text-base leading-relaxed mb-8">
                        Practice role specific mock interviews, get instant AI feedback and scores,
                        and turn every session into flashcards you'll actually remember.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/register"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#073C2E] bg-[#C9A24B] hover:bg-[#E0BB63] hover:-translate-y-0.5 transition-all"
                        >
                            Get Started Free
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            to="/login"
                            className="px-6 py-3 rounded-xl text-sm font-medium text-[#0B4D3B] border border-[#0B4D3B] hover:bg-[#0B4D3B] hover:text-[#F8E7C9] transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                <div className="flex-1 w-full max-w-md bg-linear-to-br from-[#0B4D3B] to-[#073C2E] rounded-3xl p-6 shadow-lg shadow-[#0B4D3B]/15">
                    <p className="text-[#F8E7C9]/60 text-xs mb-2">Question 4 of 10</p>
                    <p className="text-[#F8E7C9] text-base font-medium mb-4">
                        Explain the difference between Redux and Context API.
                    </p>
                    <div className="bg-[#F8E7C9]/8 rounded-xl p-3 mb-4 min-h-14">
                        <span className="text-[#F8E7C9] text-sm leading-relaxed">
                            {answer.text}
                        </span>
                        <span className={`text-[#C9A24B] font-semibold ${answer.cursor ? "opacity-100" : "opacity-0"}`}>
                            |
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="bg-[#C9A24B] text-[#073C2E] text-xs font-semibold px-3 py-1.5 rounded-full">
                            Score: 9.2
                        </span>
                        <span className="text-[#F8E7C9]/60 text-xs">AI feedback ready</span>
                    </div>
                </div>
            </section>

            <section id="features" className="px-6 md:px-12 pb-14">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white rounded-2xl border border-[#EDE6D4] p-5 shadow-sm hover:shadow-md transition-shadow">
                        <MessageSquare size={22} className="text-[#C9A24B] mb-3" />
                        <p className="text-sm font-semibold text-[#292524] mb-1.5">AI-generated questions</p>
                        <p className="text-sm text-[#78716C] leading-relaxed">
                            Tailored to your role, experience, and difficulty level.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-[#EDE6D4] p-5 shadow-sm hover:shadow-md transition-shadow">
                        <BarChart3 size={22} className="text-[#C9A24B] mb-3" />
                        <p className="text-sm font-semibold text-[#292524] mb-1.5">Instant scoring</p>
                        <p className="text-sm text-[#78716C] leading-relaxed">
                            Get a score, strengths, and gaps right after you finish.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-[#EDE6D4] p-5 shadow-sm hover:shadow-md transition-shadow">
                        <Layers size={22} className="text-[#C9A24B] mb-3" />
                        <p className="text-sm font-semibold text-[#292524] mb-1.5">Flashcard revision</p>
                        <p className="text-sm text-[#78716C] leading-relaxed">
                            Every interview becomes flashcards for quick review.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
