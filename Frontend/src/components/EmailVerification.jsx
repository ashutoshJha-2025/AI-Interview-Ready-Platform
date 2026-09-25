import { useEffect, useState } from "react";
import axios from "axios";
import { showSuccess, showError } from "../components/ToastMessageBox.jsx";
import { Mail, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RESEND_COOLDOWN_SECONDS = 30;

const EmailVerification = () => {
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [otp, setOtp] = useState("");
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN_SECONDS);
    const navigate = useNavigate();

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const timer = setInterval(() => {
            setSecondsLeft((s) => s - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [secondsLeft]);

    const handleGetOtp = async () => {
        setSendingOtp(true);
        try {
            const result = await axios.post(
                `http://localhost:3000/api/auth-user/send-otp`,
                {},
                { withCredentials: true }
            );
            showSuccess(result.data.message || "OTP sent to your email");
            setSecondsLeft(RESEND_COOLDOWN_SECONDS);
        } catch (error) {
            showError(error.response?.data?.message || error.message || "Could not send OTP");
        } finally {
            setSendingOtp(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length < 6) {
            showError("Enter the 6-digit code sent to your email");
            return;
        }
        setVerifying(true);
        try {
            const result = await axios.post(
                `http://localhost:3000/api/auth-user/verify-otp`,
                { otp },
                { withCredentials: true }
            );
            showSuccess(result.data.message || "Email verified");
            setIsEmailVerified(true);
            localStorage.removeItem('email')
            navigate("/profile");
        } catch (error) {
            showError(error.response?.data?.message || error.message || "Invalid or expired code");
        } finally {
            setVerifying(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-start bg-[#FAF6EF] px-4">
            {!isEmailVerified && (
                <div className="w-full max-w-100 mt-16 px-7 py-9 bg-white border border-[#EDE6D4] rounded-3xl shadow-lg shadow-[#0B4D3B]/8 text-center">

                    <div className="relative w-16 h-16 mx-auto mb-5">
                        <div className="w-16 h-16 rounded-2xl bg-[#EAF5EE] flex items-center justify-center">
                            <Mail size={28} className="text-[#0B4D3B]" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5.5 h-5.5 rounded-full bg-[#C9A24B] border-2 border-white flex items-center justify-center">
                            <Check size={12} className="text-[#073C2E]" />
                        </div>
                    </div>

                    <h1 className="text-xl font-bold text-[#292524] mb-2">Verify your email</h1>
                    <p className="text-sm text-[#78716C] leading-relaxed mb-6">
                        One Time Password (OTP) has been sent on
                        <br />
                        <span className="text-[#0B4D3B] font-semibold">{localStorage.getItem('email') || "your email"}</span>
                    </p>

                    <p className="text-xs font-semibold text-[#57534E] mb-2.5">
                        Enter the OTP to verify your email
                    </p>

                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter OTP"
                        className="w-full border border-[#E7E1D3] bg-[#FAF6EF]/50 rounded-xl px-4 py-3 text-base text-center text-[#292524] tracking-[6px] outline-none focus:border-[#0B4D3B] focus:ring-2 focus:ring-[#0B4D3B]/15 transition-all mb-4"
                    />

                    <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={verifying}
                        className="w-full bg-[#0B4D3B] text-[#F8E7C9] text-sm font-semibold py-3 rounded-xl transition-colors hover:bg-[#073C2E] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mb-3.5"
                    >
                        {verifying ? "Verifying..." : "Verify Email"}
                    </button>

                    {secondsLeft > 0 ? (
                        <p className="text-xs text-[#A8A29E]">
                            Resend code in <span className="text-[#292524] font-semibold">{secondsLeft}</span> seconds
                        </p>
                    ) : (
                        <button
                            type="button"
                            onClick={handleGetOtp}
                            disabled={sendingOtp}
                            className="text-xs font-semibold text-[#0B4D3B] hover:text-[#C9A24B] transition-colors cursor-pointer disabled:opacity-60"
                        >
                            {sendingOtp ? "Sending..." : "Resend code"}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default EmailVerification;