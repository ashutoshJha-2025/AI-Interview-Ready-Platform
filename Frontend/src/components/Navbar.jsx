import { Link, useLocation } from "react-router-dom";
import { User } from "lucide-react";

const NAV_LINKS = [
    { label: "Home", to: "/dashboard" },
    { label: "History", to: "/interview/history" },
    { label: "Revision", to: "/interview/review" },
];

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="w-full sticky top-0 z-30 backdrop-blur-md bg-white/90 border-b border-[#EDE6D4] px-8 py-3 flex items-center justify-between">

            <Link to="/dashboard" className="text-md font-bold text-[#073C2E] leading-tight">
                Get<br />
                Interview<span className="text-[#C9A24B]">Ready</span>!
            </Link>

            <div className="hidden md:flex items-center gap-7">
                {NAV_LINKS.map((link) => {
                    const isActive = location.pathname.startsWith(link.to);
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`text-sm font-medium pb-0.5 border-b-2 transition-colors ${isActive
                                ? "text-[#C9A24B] border-[#C9A24B]"
                                : "text-[#57534E] border-transparent hover:text-[#0B4D3B]"
                                }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 text-sm text-[#292524] hover:bg-[#FAF6EF] transition-colors border border-gray-300 rounded-lg"
            >
                <User size={18} className="text-[#78716C]" />
                View Profile
            </Link>
        </nav>
    );
};

export default Navbar;