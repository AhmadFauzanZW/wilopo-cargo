import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import { shipmentsAPI } from '../services/api';
import { Package, TruckIcon, CheckCircle, Eye } from 'lucide-react';

const Dashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, delivered: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [shipmentsRes, statsRes] = await Promise.all([
        shipmentsAPI.getAll(),
        shipmentsAPI.getStats(),
      ]);
      
      // Handle new API response structure with pagination
      const shipmentsData = shipmentsRes.data.shipments || shipmentsRes.data;
      setShipments(Array.isArray(shipmentsData) ? shipmentsData : []);
      setStats(statsRes.data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's an overview of your shipments.</p>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Shipments"
            value={stats.total}
            icon={Package}
            color="primary"
          />
          <StatCard
            title="In Transit"
            value={stats.active}
            icon={TruckIcon}
            color="yellow"
          />
          <StatCard
            title="Delivered"
            value={stats.delivered}
            icon={CheckCircle}
            color="green"
          />
        </div>

        {/* Shipments Table */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Shipments</h2>
          </div>

          {shipments.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No shipments yet</h3>
              <p className="text-gray-600">Your shipments will appear here once they're created.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Tracking Number
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Origin → Destination
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Weight
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Created
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment) => (
                    <tr key={shipment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <span className="font-medium text-primary-600">
                          {shipment.trackingNumber}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <span className="font-medium">{shipment.origin}</span>
                          <span className="text-gray-400 mx-2">→</span>
                          <span className="font-medium">{shipment.destination}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={shipment.status} />
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {shipment.weight} kg
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {formatDate(shipment.createdAt)}
                      </td>
                      <td className="py-4 px-4">
                        <Link
                          to={`/shipments/${shipment.id}`}
                          className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
