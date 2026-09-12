import Profile from "./pages/Profile"
import LandingPage from "./pages/LandingPage"
import { Route, Routes } from "react-router-dom"
import LogIn from "./pages/Login"
import Register from "./pages/Register"
import { ToastMessageBox } from "./components/ToastMessageBox"
import EmailVerification from "./components/EmailVerification"

const App = () => {
  return (
    <>
    <ToastMessageBox />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/email-verifiied" element={<EmailVerification />} />
      </Routes>
    </>
  )
}

export default App