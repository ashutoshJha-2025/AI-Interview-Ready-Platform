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
        <Route path="*" element={<NotFound />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit-details" element={<ProfileUpdate />} />
          <Route path="/home" element={<Home />} />
        </Route>

      </Routes>
    </>
  )
}

export default App