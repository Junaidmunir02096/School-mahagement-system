import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden">

      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#4D44B5] flex items-center px-4 z-50 lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white text-xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Open sidebar"
          aria-expanded={sidebarOpen}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <span className="text-white font-bold text-lg ml-3" style={{ fontFamily: "Sora, sans-serif" }}>EduCore</span>
      </nav>

      {/* Backdrop overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-[999] lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen z-[1000] lg:z-auto
          transition-transform duration-300 ease-in-out
          ${ sidebarOpen ? "translate-x-0" : "-translate-x-full" } lg:translate-x-0
          flex-shrink-0`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto mt-16 lg:mt-0">
        <Outlet />
      </div>

    </div>
  );
};

export default DashboardLayout;