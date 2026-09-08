import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import AdminPortfolio from "./AdminPortfolio";
import NewsAdmin from "./NewsAdmin";

export default function AdminDashboard() {
    const menuClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
            isActive
                ? "bg-[#123F72] text-white"
                : "text-gray-600 hover:bg-gray-100"
        }`;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
                {/* Logo */}
                <div className="h-20 flex items-center px-6 border-b border-gray-200">
                    <div>
                        <h1 className="text-xl font-bold text-[#123F72]">
                            Senvra
                        </h1>

                        <p className="text-xs text-gray-400 mt-1">
                            Admin Dashboard
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    <NavLink
                        to="/admin/portfolio"
                        className={menuClass}
                    >
                        <span className="text-lg">📁</span>
                        <span>Portfolio</span>
                    </NavLink>

                    <NavLink
                        to="/admin/news"
                        className={menuClass}
                    >
                        <span className="text-lg">📰</span>
                        <span>News</span>
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 min-h-screen">
                {/* Topbar */}
                <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-end px-8 sticky top-0 z-40">
                    <a
                        href="/"
                        className="bg-[#123F72] hover:bg-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
                    >
                        View Website
                    </a>
                </header>

                {/* Page Content */}
                <div className="p-8">
                    <Routes>
                        <Route
                            index
                            element={
                                <Navigate
                                    to="/admin/portfolio"
                                    replace
                                />
                            }
                        />

                        <Route
                            path="portfolio"
                            element={<AdminPortfolio />}
                        />

                        <Route
                            path="news"
                            element={<NewsAdmin />}
                        />
                    </Routes>
                </div>
            </main>
        </div>
    );
}