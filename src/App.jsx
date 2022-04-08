import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import "./App.css";
import Background from "./components/background/Background";
import BrandingPage from "./components/pages/brandingPage/BrandingPage";
import Main from "./components/pages/mainPage/Main";
import SkillsContent from "./components/pages/skillsPage/hardSkills/skillsContent/SkillsContent";
import AlertBox from "./components/alertBox/AlertBox";
import SupportAlert from "./components/supportAlert/SupportAlert";
import SoftSkillsContent from "./components/pages/skillsPage/softSkills/skillsContent/SkillsContent";
import Login from "./components/auth/login/Login";
import Confirm from "./components/auth/confirm/Confirm";
import PageNotFound from "./components/pages/pageNotFound/PageNotFound";

function App() {
  return (
    <div className="App">
      <SupportAlert />
      <Background />
      <AlertBox />
      <div className="container">
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/hardSkills" element={<SkillsContent />} />
            <Route exact path="/softSkills" element={<SoftSkillsContent />} />
            <Route exact path="/branding" element={<BrandingPage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/confirm" element={<Confirm />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
