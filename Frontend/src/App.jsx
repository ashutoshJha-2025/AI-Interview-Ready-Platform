import Profile from "./pages/Profile"
import LandingPage from "./pages/LandingPage"
import { Route, Routes } from "react-router-dom"
import LogIn from "./pages/Login"
import Register from "./pages/Register"
import { ToastMessageBox } from "./components/ToastMessageBox"
import EmailVerification from "./components/EmailVerification"
import ProfileUpdate from "./components/ProfileUpdate"
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./pages/NotFound"
import Interview from "./pages/Interview"
import InterviewAnswers from "./pages/InterviewAnswers"
import Revision from "./pages/Revision"
import History from "./pages/History"
import InterviewResult from "./pages/InterviewResult"

const App = () => {
  return (
    <>
      <ToastMessageBox />
      <Routes>

        {/* public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email-verifiied" element={<EmailVerification />} />
        <Route path="/interview-started" element={<Interview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit-details" element={<ProfileUpdate />} />
        <Route path="/home" element={<Home />} />
        <Route path="/interview-answer" element={<InterviewAnswers />} />
        <Route path="/history" element={<History />} />
        <Route path="/revision" element={<Revision />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/interview-result/:interviewId" element={<InterviewResult />} />

        {/* protected routes */}
        {/* // <Route element={<ProtectedRoute />}>

        // </Route> */}

      </Routes>
    </>
  )
}

export default App