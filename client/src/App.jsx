import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ShipmentDetail from './pages/ShipmentDetail';
import Calculator from './pages/Calculator';
import Analytics from './pages/Analytics';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import NotFound from './pages/NotFound';

// Smart redirect component based on user role
const RootRedirect = () => {
  const { user } = useAuth();
  
  if (user?.role?.toUpperCase() === 'ADMIN') {
    return <Navigate to="/admin" replace />;
  }
  return <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/shipments/:id" element={<ShipmentDetail />} />
            <Route path="/calculator" element={<Calculator />} />
          </Route>
          
          <Route element={<AdminRoute />}>
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
          </Route>
          
          <Route path="/" element={<RootRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
