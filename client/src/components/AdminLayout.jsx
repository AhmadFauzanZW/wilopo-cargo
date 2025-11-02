import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, BarChart3, LayoutDashboard, LogOut, User } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import logoWhite from '../assets/logo-wilopo-white.png';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-600 border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/admin" className="flex items-center space-x-3">
                <img src={logoWhite} alt="Wilopo Cargo" className="h-10 w-auto" />
                <span className="ml-2 text-xs bg-white text-blue-600 px-2 py-1 rounded-full font-semibold">ADMIN</span>
              </Link>
              
              <nav className="hidden md:flex space-x-1">
                <Link
                  to="/admin"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/admin')
                      ? 'bg-white text-blue-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/analytics"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/analytics')
                      ? 'bg-white text-blue-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </Link>
                <Link
                  to="/admin/users"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/admin/users')
                      ? 'bg-white text-blue-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <div className="flex items-center space-x-2 text-white">
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">{user?.fullName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2025 Wilopo Cargo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
