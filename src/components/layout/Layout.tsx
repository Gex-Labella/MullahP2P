import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Moon,
  Sun,
  Settings,
  Activity,
  TrendingUp,
  Home,
  LogOut,
  Github,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import { useEffect, useState } from "react";

interface LayoutProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Layout({ darkMode, toggleDarkMode }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const logout = () => {
    navigate("/login");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Reduced loading time
  }, [darkMode]);

  // Add CSS styles for the components
  useEffect(() => {
    const styles = `
      .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
      }
      
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255,255,255,0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .app-name {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 10px;
        background: linear-gradient(45deg, #fff, #a78bfa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .app-container {
        display: flex;
        min-height: 100vh;
        background-color: ${darkMode ? "#0f172a" : "#f8fafc"};
      }
      
      .sidebar {
        width: 280px;
        background: ${darkMode ? "#1e293b" : "#ffffff"};
        border-right: 1px solid ${darkMode ? "#334155" : "#e2e8f0"};
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
      }
      
      .logo {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid ${darkMode ? "#334155" : "#e2e8f0"};
      }
      
      .logo-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .logo-text {
        font-size: 1.5rem;
        font-weight: bold;
        background: linear-gradient(45deg, #3b82f6, #10b981);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .nav-menu {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
      }
      
      .nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 12px;
        color: ${darkMode ? "#cbd5e1" : "#64748b"};
        text-decoration: none;
        transition: all 0.2s;
        cursor: pointer;
        font-weight: 500;
      }
      
      .nav-item:hover {
        background: ${darkMode ? "#334155" : "#f1f5f9"};
        color: ${darkMode ? "#ffffff" : "#1e293b"};
      }
      
      .nav-item.active {
        background: linear-gradient(45deg, #3b82f6, #10b981);
        color: white;
      }
      
      .user-profile {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: ${darkMode ? "#334155" : "#f8fafc"};
        border-radius: 12px;
        margin-top: auto;
      }
      
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(45deg, #3b82f6, #10b981);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
      }
      
      .user-info {
        flex: 1;
      }
      
      .user-name {
        font-weight: 600;
        color: ${darkMode ? "#ffffff" : "#1e293b"};
        font-size: 0.9rem;
      }
      
      .user-role {
        font-size: 0.8rem;
        color: ${darkMode ? "#94a3b8" : "#64748b"};
      }
      
      .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        background: ${darkMode ? "#1e293b" : "#ffffff"};
        border-bottom: 1px solid ${darkMode ? "#334155" : "#e2e8f0"};
      }
      
      .ethereum-logo {
        margin-right: 12px;
      }
      
      .page-title {
        font-size: 1.5rem;
        font-weight: bold;
        color: ${darkMode ? "#ffffff" : "#1e293b"};
      }
      
      .theme-toggle {
        width: 50px;
        height: 26px;
        background: ${darkMode ? "#374151" : "#e5e7eb"};
        border-radius: 13px;
        position: relative;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      
      .theme-toggle-handle {
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #3b82f6, #10b981);
        border-radius: 50%;
        position: absolute;
        top: 3px;
        transition: transform 0.3s;
        transform: translateX(${darkMode ? "24px" : "3px"});
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [darkMode]);

  return (
    <div className="min-h-screen">
      {/* Loading Screen */}
      {loading && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <div className="app-name">P2P Mullah</div>
          <p>Loading your dashboard...</p>
        </div>
      )}

      <div className="app-container">
        {/* Sidebar Navigation */}
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 784 784"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M392 784C608.569 784 784 608.569 784 392C784 175.431 608.569 0 392 0C175.431 0 0 175.431 0 392C0 608.569 175.431 784 392 784Z"
                  fill="#627EEA"
                />
                <path
                  d="M406.24 97.9999V315.31L588.3 395.65L406.24 97.9999Z"
                  fill="white"
                  fillOpacity="0.602"
                />
                <path
                  d="M406.24 97.9999L224.16 395.65L406.24 315.31V97.9999Z"
                  fill="white"
                />
                <path
                  d="M406.24 537.19V685.97L588.35 431.23L406.24 537.19Z"
                  fill="white"
                  fillOpacity="0.602"
                />
                <path
                  d="M406.24 685.97V537.18L224.16 431.23L406.24 685.97Z"
                  fill="white"
                />
                <path
                  d="M406.24 503.47L588.3 397.5L406.24 317.21V503.47Z"
                  fill="white"
                  fillOpacity="0.2"
                />
                <path
                  d="M224.16 397.5L406.24 503.47V317.21L224.16 397.5Z"
                  fill="white"
                  fillOpacity="0.602"
                />
              </svg>
            </div>
            <div className="logo-text">P2P Mullah</div>
          </div>

          <nav className="nav-menu">
            <Link
              to="/"
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/network-status"
              className={`nav-item ${
                location.pathname === "/network-status" ? "active" : ""
              }`}
            >
              <Activity className="h-5 w-5" />
              <span>Network Status</span>
            </Link>
            <Link
              to="/statistics"
              className={`nav-item ${
                location.pathname === "/statistics" ? "active" : ""
              }`}
            >
              <TrendingUp className="h-5 w-5" />
              <span>P2P Statistics</span>
            </Link>
            <Link
              to="/settings"
              className={`nav-item ${
                location.pathname === "/settings" ? "active" : ""
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>

            {/* Theme Toggle in Sidebar */}
            <div className="nav-item" onClick={toggleDarkMode}>
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </div>

            <div className="nav-item" onClick={logout}>
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </div>
          </nav>

          <div className="user-profile">
            <div className="user-avatar">JS</div>
            <div className="user-info">
              <div className="user-name">John Smith</div>
              <div className="user-role">Premium Member</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="flex items-center gap-3">
            <h1 className="page-title">
              {location.pathname === "/network-status" && "Network Status"}
              {location.pathname === "/statistics" && "P2P Statistics"}
              {location.pathname === "/settings" && "Settings"}
            </h1>
          </div>

          {/* Main content outlet */}
          <div style={{ flex: 1, padding: "0" }}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
          background: darkMode ? "#1e293b" : "#f8fafc",
          padding: "1.5rem",
        }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p
              style={{
                fontSize: "0.875rem",
                color: darkMode ? "#94a3b8" : "#64748b",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(45deg, #3b82f6, #10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: "bold",
                }}
              >
                P2P Mullah
              </span>{" "}
              • Built for multi-chain • Powered by TKC
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                fontSize: "0.875rem",
                color: darkMode ? "#94a3b8" : "#64748b",
              }}
            >
              <a
                href="#"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <BookOpen className="h-4 w-4" />
                Docs
              </a>
              <a
                href="#"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <MessageCircle className="h-4 w-4" />
                Support
              </a>
              <a
                href="#"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
