import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Only the landing page is publicly accessible */}
      <Route path="/" element={<Index />} />
      {/* All other routes redirect to landing page - hidden from public view */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
