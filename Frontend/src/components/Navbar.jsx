import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, User } from "lucide-react";

const NAV_LINKS = [
    { label: "Home", to: "/home" },
    { label: "History", to: "/history" },
    { label: "Revision", to: "/revision" },
];

const Navbar = ({ userName = "User" }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const initial = userName?.trim()?.[0]?.toUpperCase() || "U";

    return (
        <nav className="w-full sticky top-0 z-30 backdrop-blur-md bg-white/90 border-b border-[#EDE6D4] px-8 py-3 flex items-center justify-between">

            <Link to="/home" className="text-md font-bold text-[#073C2E] leading-tight">
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

            <div className="flex items-center gap-3">
                <div className="relative" ref={menuRef}>
                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex items-center gap-2 border border-[#EDE6D4] pl-1 pr-2.5 py-1 rounded-full hover:bg-[#FAF6EF] transition-colors cursor-pointer"
                    >
                        <span className="w-7 h-7 rounded-full bg-[#0B4D3B] text-[#F8E7C9] text-xs font-semibold flex items-center justify-center">
                            {initial}
                        </span>
                        <span className="text-sm font-medium text-[#292524] hidden sm:inline">{userName}</span>
                        <ChevronDown size={14} className="text-[#A8A29E]" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-[#EDE6D4] rounded-xl shadow-lg py-1.5 overflow-hidden">
                            <Link
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#292524] hover:bg-[#FAF6EF] transition-colors"
                            >
                                <User size={15} className="text-[#78716C]" />
                                View Profile
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;