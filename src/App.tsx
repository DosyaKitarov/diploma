import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import ProjectDetails from "./pages/ProjectDetails";
import InvestorDashboard from "./pages/InvestorDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { MainNav } from "./components/navigation/MainNav";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainNav />
              <Home />
            </>
          }
        />
        <Route
          path="/marketplace"
          element={
            <>
              <MainNav />
              <Marketplace />
            </>
          }
        />
        <Route
          path="/project/:id"
          element={
            <>
              <MainNav />
              <ProjectDetails />
            </>
          }
        />
        <Route
          path="/investor-dashboard"
          element={
            <DashboardLayout userRole="investor">
              <InvestorDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/farmer-dashboard"
          element={
            <DashboardLayout userRole="farmer">
              <FarmerDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <DashboardLayout userRole="admin">
              <AdminDashboard />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;