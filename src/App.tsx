import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import CookiePolicy from "./pages/CookiePolicy";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Gallery from "./pages/Gallery";
import Credits from "./pages/Credits";
import MLSCompliance from "./pages/MLSCompliance";
import Newsletter from "./pages/Newsletter";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/about" element={<About />} />
      <Route path="/cookies" element={<CookiePolicy />} />

      <Route path="/mls-compliance" element={<MLSCompliance />} />
      <Route path="/newsletter" element={<Newsletter />} />

      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/gallery" element={<Gallery />} />
      <Route path="/dashboard/credits" element={<Credits />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
