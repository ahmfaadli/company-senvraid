import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import AdminDashboard from "./admin/AdminDashboard";
import Form from "./pages/Form";

function App() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");

    if (isAdmin) {
        return (
            <Routes>
                <Route
                    path="/admin/*"
                    element={<AdminDashboard />}
                />
            </Routes>
        );
    }

    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen">
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/project/:id"
                    element={<ProjectDetail />}
                />

                <Route
                    path="/contact"
                    element={<Form />}
                />
            </Routes>
        </div>
    );
}

export default App;