import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();
    const back = localStorage.getItem('isAuth')
    console.log(back)

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#FAF6EF] px-4">
            <div className="w-full max-w-md text-center">
                <p className="text-7xl font-extrabold text-[#0B4D3B] leading-none">404</p>

                <div className="w-14 h-0.5 bg-[#C9A24B] mx-auto my-5" />

                <h1 className="text-xl font-semibold text-[#292524] mb-2">Page not found</h1>
                <p className="text-sm text-[#78716C] leading-relaxed mb-8">
                    The page you're looking for doesn't exist or may have been moved.
                </p>

                <div className="flex items-center justify-center gap-3">
                    <Link
                        to={back === 'true' ? '/home' : '/'}
                        className="flex items-center gap-2 bg-[#0B4D3B] text-[#F8E7C9] text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors hover:bg-[#073C2E]"
                    >
                        <Home size={16} />
                        Back to Home
                    </Link>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm font-medium text-[#57534E] border border-[#E7E1D3] px-5 py-2.5 rounded-xl transition-colors hover:bg-white cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;