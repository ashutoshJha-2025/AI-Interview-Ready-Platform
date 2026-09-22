import { useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { showSuccess, showError } from "../components/ToastMessageBox.jsx";
import { Upload, Plus, ShieldCheck, Clock, MailWarning } from "lucide-react";
import { useNavigate } from "react-router-dom";


const EmailVerification = () => {
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [otp, setOtp] = useState("");
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const navigate = useNavigate()


    const handleGetOtp = async () => {
        setSendingOtp(true);
        try {
            const result = await axios.post(
                `http://localhost:3000/api/auth-user/send-otp`,
                {},
                { withCredentials: true }
            );
            showSuccess(result.data.message || "OTP sent to your email");
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
        } catch (error) {
            showError(error.response?.data?.message || error.message || "Invalid or expired code");
        } finally {
            setVerifying(false);
            navigate('/profile')
        }
    };

    return (
        <>
            <div className="w-full min-h-screen flex justify-center items-start bg-white">
                {!isEmailVerified && (
                    <div className="w-100 mt-15 px-4.5 py-4  border border-[#EDE6D4] rounded-2xl overflow-hidden shadow-sm">
                        <div className="flex items-start gap-2 mb-3">
                            <MailWarning size={16} className="text-[#C9A24B] mt-0.5 shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-[#292524]">Verify your email</p>
                                <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                                    A 6-digit code was sent to your email address. Enter it below to activate your account.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                placeholder="Enter OTP"
                                className="flex-1 min-w-0 border border-[#E7E1D3] bg-[#FAF6EF]/50 rounded-lg px-3 py-2 text-sm text-[#292524] tracking-widest outline-none focus:border-[#0B4D3B] focus:ring-2 focus:ring-[#0B4D3B]/15 transition-all"
                            />
                            <button
                                type="button"
                                onClick={handleGetOtp}
                                disabled={sendingOtp}
                                className="shrink-0 bg-[#C9A24B] text-[#073C2E] text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors hover:bg-[#E0BB63] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {sendingOtp ? "Sending..." : "Get OTP"}
                            </button>
                            <button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={verifying}
                                className="shrink-0 bg-[#0B4D3B] text-[#F8E7C9] text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors hover:bg-[#073C2E] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {verifying ? "Verifying..." : "Verify"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default EmailVerification
