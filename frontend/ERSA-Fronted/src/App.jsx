import "./App.css";
import Home from "./pages/Home";
import SoftStory from "./pages/SoftStory";
import Zone from "./pages/Zone";
import ExtensiveAnalysis from "./pages/ExtensiveAnalysis";
import { BrowserRouter, Routes, Outlet, Route } from "react-router-dom";
import Report from "./pages/Report";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/soft-story" element={<SoftStory />} />
          <Route path="/report" element={<Report />} />
          <Route path="/zone" element={<Zone />} />
          <Route path="/extensive-analysis" element={<ExtensiveAnalysis />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
