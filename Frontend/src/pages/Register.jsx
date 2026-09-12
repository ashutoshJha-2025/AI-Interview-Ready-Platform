import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { showSuccess, showError, showWarning, showInfo } from "../components/ToastMessageBox.jsx";
import axios from 'axios'

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const sendData = async () => {
        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            showWarning('Fill in all fields to continue')
            return
        }

        if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[_@])[a-zA-Z0-9_@]+$/.test(formData.username)) {
            showWarning(
                'Username must contain at least one letter, one number, and an underscore or @ symbol'
            )
            return
        }

        if (formData.password !== formData.confirmPassword) {
            showError('Passwords do not match')
            return
        }
        if (formData.password.length < 8) {
            showWarning('Passwords should be of 8 length')
            return
        }

        setLoading(true)
        try {
            const { confirmPassword, ...payload } = formData
            const result = await axios.post(`http://localhost:3000/api/auth-user/register`, payload, { withCredentials: true })
            showSuccess(result.data.message)
            setTimeout(() => {
                navigate('/profile')
                showInfo('Verify your email using the OTP sent to your inbox')
                setFormData({ username: '', email: '', password: '', confirmPassword: '' })
            }, 1000)
        } catch (error) {
            showError(error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message || 'Invalid credentials')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-[#FAF6EF] px-4 py-10">
            <div className="w-full max-w-3xl flex flex-col sm:flex-row rounded-3xl overflow-hidden shadow-xl shadow-[#0B4D3B]/15">

                <div className="sm:flex-[0_0_42%] bg-linear-to-br from-[#0B4D3B] to-[#073C2E] px-8 py-9">
                    <span className="text-lg font-bold text-[#F8E7C9]">
                        Interview<span className="text-[#C9A24B]">Ready</span>
                    </span>
                    <p className="text-[#F8E7C9]/70 text-sm mt-4 leading-relaxed">
                        Create an account and start practicing in minutes.
                    </p>
                </div>

                <div className="flex-1 bg-white px-8 py-9">
                    <h1 className="text-2xl font-semibold text-[#292524] mb-1">Create your account</h1>
                    <p className="text-sm text-[#78716C] mb-6">Get interview ready in under a minute.</p>

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-[#57534E] mb-1.5">
                                Username
                            </label>
                            <div className="flex items-center gap-2 rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/50 px-3.5 py-2.5 focus-within:border-[#0B4D3B] focus-within:ring-2 focus-within:ring-[#0B4D3B]/15 transition-all">
                                <User size={16} className="text-[#A8A29E] shrink-0" />
                                <input
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^[a-zA-Z0-9_@]*$/.test(value)) {
                                            setFormData({
                                                ...formData,
                                                username: value
                                            });
                                        }
                                    }} type="text"
                                    autoComplete="username"
                                    placeholder="Enter username"
                                    className="w-full bg-transparent text-sm text-[#292524] outline-none"
                                />
                            </div>

                            <p className="mt-1 text-xs text-red-500">
                                Username can contain letters, numbers, _ or @ symbol only.
                            </p>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#57534E] mb-1.5">
                                Email
                            </label>
                            <div className="flex items-center gap-2 rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/50 px-3.5 py-2.5 focus-within:border-[#0B4D3B] focus-within:ring-2 focus-within:ring-[#0B4D3B]/15 transition-all">
                                <Mail size={16} className="text-[#A8A29E] shrink-0" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className="w-full bg-transparent text-sm text-[#292524] outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#57534E] mb-1.5">
                                Password
                            </label>
                            <div className="flex items-center gap-2 rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/50 px-3.5 py-2.5 focus-within:border-[#0B4D3B] focus-within:ring-2 focus-within:ring-[#0B4D3B]/15 transition-all">
                                <Lock size={16} className="text-[#A8A29E] shrink-0" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Create a password of 8 length"
                                    className="w-full bg-transparent text-sm text-[#292524] outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    className="text-[#A8A29E] hover:text-[#0B4D3B] transition-colors shrink-0"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#57534E] mb-1.5">
                                Confirm Password
                            </label>
                            <div className="flex items-center gap-2 rounded-xl border border-[#E7E1D3] bg-[#FAF6EF]/50 px-3.5 py-2.5 focus-within:border-[#0B4D3B] focus-within:ring-2 focus-within:ring-[#0B4D3B]/15 transition-all">
                                <Lock size={16} className="text-[#A8A29E] shrink-0" />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder="Re-enter password"
                                    className="w-full bg-transparent text-sm text-[#292524] outline-none"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => sendData()}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#C9A24B] text-[#073C2E] px-4 py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-[#E0BB63] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {loading ? 'Creating account...' : 'Sign up'}
                        </button>

                        <p className="text-center text-sm text-[#78716C]">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#0B4D3B] font-semibold hover:text-[#C9A24B] transition-colors">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
