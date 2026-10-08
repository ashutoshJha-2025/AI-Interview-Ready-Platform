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

const ROUTES = {
  home: "/dashboard",
  landing: "/",
  login: "/login",
  register: "/register",
  verifyEmail: "/verify-email",
  profile: "/profile",
  profileEdit: "/profile/edit",
  interviewStart: "/interview/start",
  interviewAnswers: "/interview/answers",
  interviewHistory: "/interview/history",
  interviewReview: "/interview/review",
  interviewResult: "/interview/result/:interviewId",
}

const App = () => {
  return (
    <>
      <ToastMessageBox />
      <Routes>

        {/* public routes */}
        <Route path={ROUTES.landing} element={<LandingPage />} />
        <Route path={ROUTES.login} element={<LogIn />} />
        <Route path={ROUTES.register} element={<Register />} />
        <Route path={ROUTES.verifyEmail} element={<EmailVerification />} />
        <Route path="*" element={<NotFound />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.interviewStart} element={<Interview />} />
          <Route path={ROUTES.profile} element={<Profile />} />
          <Route path={ROUTES.profileEdit} element={<ProfileUpdate />} />
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.interviewAnswers} element={<InterviewAnswers />} />
          <Route path={ROUTES.interviewHistory} element={<History />} />
          <Route path={ROUTES.interviewReview} element={<Revision />} />
          <Route path={ROUTES.interviewResult} element={<InterviewResult />} />
        </Route>

      </Routes>
    </>
  )
}

export default App