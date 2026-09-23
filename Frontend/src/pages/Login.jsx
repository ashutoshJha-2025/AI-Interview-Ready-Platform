import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { showSuccess, showError, showWarning, showInfo } from "../components/ToastMessageBox.jsx";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const sendData = async () => {
        if (!formData.email || !formData.password) {
            showError('Enter your email and password')
            return
        }
        if (formData.password.length < 8) {
            showWarning('Passwords should be of 8 length')
            return
        }

        setLoading(true)
        try {
            const result = await axios.post(`http://localhost:3000/api/auth-user/login`, formData, { withCredentials: true })
            showSuccess(result.data.message)
            setTimeout(() => {
                navigate('/profile')
                setFormData({ email: '', password: '' })
            }, 1000)
        } catch (error) {
            showError(error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message || 'Invalid credentials')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div id="login-page" className="w-full min-h-screen flex items-center justify-center bg-[#FAF6EF] px-4 py-10">
            <div className="w-full max-w-3xl flex flex-col sm:flex-row rounded-3xl overflow-hidden shadow-xl shadow-[#0B4D3B]/15">

                <div className="sm:flex-[0_0_42%] bg-linear-to-br from-[#0B4D3B] to-[#073C2E] px-8 py-9 ">
                    <span className="text-lg font-bold text-[#F8E7C9]">
                        Interview<span className="text-[#C9A24B]">Ready</span>
                    </span>
                    <p className="text-[#F8E7C9]/70 text-sm mt-4 leading-relaxed">
                        Sign in to pick up your prep where you left off.
                    </p>
                </div>

                <div className="flex-1 bg-white px-8 py-9">
                    <h1 className="text-2xl font-semibold text-[#292524] mb-1">Welcome back</h1>
                    <p className="text-sm text-[#78716C] mb-6">Log in to continue your prep.</p>

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter password"
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

                        <div className="flex justify-end text-sm">
                            <Link 
                                onClick={() => showInfo('Password reset is not available at the moment.')}
                            to="" className="text-[#0B4D3B] font-medium hover:text-[#C9A24B] transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            onClick={sendData}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#C9A24B] text-[#073C2E] px-4 py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-[#E0BB63] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>

                        <p className="text-center text-sm text-[#78716C]">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-[#0B4D3B] font-semibold hover:text-[#C9A24B] transition-colors">
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
