import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/homepage/HomePage";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import WasteVideo2 from "./components/wastevideo/WasteVideo2";
import WasteVideo from "./components/wastevideo/WasteVideo";
import Landing from "./components/Landing";
import "./App.css";
import PredictionList from "./components/predictions/PredictionList";
import Pickup from "./components/pickup/pickup.jsx";

/* CORRECT DONATE IMPORT */
import Donate from "./pages/donate.jsx";
/* ADMIN DASHBOARD */
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";

function App() {
return ( <div className="App"> <BrowserRouter>

```
    <Navbar />

    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/video" element={<WasteVideo2 />} />
      <Route path="/image" element={<WasteVideo />} />
      <Route path="/predictionlist" element={<PredictionList />} />
      <Route path="/pickup" element={<Pickup />} />
      <Route path="/donate" element={<Donate />} />

      {/* ADMIN DASHBOARD */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>

    <Footer />

  </BrowserRouter>
</div>


);
}

export default App;
