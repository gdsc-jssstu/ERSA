import './App.css'
import Home from './pages/Home'
import SoftStory from './pages/SoftStory'
import { BrowserRouter, Routes, Outlet, Route } from "react-router-dom";

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/soft-story" element={<SoftStory />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
