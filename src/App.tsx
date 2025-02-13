
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvestorDashboard from "./pages/InvestorDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Marketplace from "./pages/Marketplace";
import ProjectDetails from "./pages/ProjectDetails";
import Profile from "./pages/Profile";
import CreateLot from "./pages/CreateLot";
import AdminLotReview from "./pages/AdminLotReview";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/investor-dashboard" element={<InvestorDashboard />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-lot" element={<CreateLot />} />
        <Route path="/admin/review-lots" element={<AdminLotReview />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
