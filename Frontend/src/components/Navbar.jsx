import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, User } from "lucide-react";

const NAV_LINKS = [
    { label: "Home", to: "/dashboard" },
    { label: "History", to: "/interview/history" },
    { label: "Revision", to: "/interview/review" },
];
const PROFILE_LINK = { label: "Profile", to: "/profile" };

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActiveLink = (to) => location.pathname.startsWith(to);
    const currentPage = [...NAV_LINKS, PROFILE_LINK].find((link) => isActiveLink(link.to));
    const getLinkClassName = (to) => {
        const isActive = isActiveLink(to);
        return `text-sm font-medium pb-0.5 border-b-2 transition-colors ${isActive
            ? "text-[#C9A24B] border-[#C9A24B]"
            : "text-[#57534E] border-transparent hover:text-[#0B4D3B]"
            }`;
    };

    return (
        <nav className="w-full sticky top-0 z-30 backdrop-blur-md bg-white/90 border-b border-[#EDE6D4] px-8 py-3 flex items-center justify-between max-[400px]:px-4">

            <Link to="/dashboard" className="text-md font-bold text-[#073C2E] leading-tight">
                Get<br />
                Interview<span className="text-[#C9A24B]">Ready</span>!
            </Link>

            <div className="flex items-center gap-7 max-[560px]:hidden">
                {NAV_LINKS.map((link) => {
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={getLinkClassName(link.to)}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 text-sm text-[#292524] hover:bg-[#FAF6EF] transition-colors border border-gray-300 rounded-lg max-[560px]:hidden"
            >
                <User size={18} className="text-[#78716C]" />
                View Profile
            </Link>

            <div className="relative hidden max-[560px]:block">
                <button
                    type="button"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-[#292524] hover:bg-[#FAF6EF] transition-colors border border-gray-300 rounded-lg"
                >
                    {currentPage?.label ?? "Menu"}
                    <ChevronDown
                        size={16}
                        className={`text-[#78716C] transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                    />
                </button>

                {isMenuOpen && (
                    <div
                        id="mobile-navigation"
                        className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-[#EDE6D4] bg-white py-2 shadow-lg"
                    >
                        {[...NAV_LINKS, PROFILE_LINK].map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-2 text-sm transition-colors hover:bg-[#FAF6EF] ${isActiveLink(link.to) ? "text-[#C9A24B]" : "text-[#57534E] hover:text-[#0B4D3B]"}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;