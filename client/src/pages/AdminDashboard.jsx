import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, Package, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalShipments: 0,
    totalRevenue: 0,
    recentShipments: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [usersRes, shipmentsRes, analyticsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/admin/users`, config),
        axios.get(`${import.meta.env.VITE_API_URL}/shipments`, config),
        axios.get(`${import.meta.env.VITE_API_URL}/analytics/revenue`, config)
      ]);

      const shipmentsData = shipmentsRes.data.shipments || shipmentsRes.data || [];
      
      setStats({
        totalUsers: usersRes.data.length,
        totalShipments: Array.isArray(shipmentsData) ? shipmentsData.length : 0,
        totalRevenue: analyticsRes.data.totalRevenue || 0,
        recentShipments: Array.isArray(shipmentsData) ? shipmentsData.slice(0, 5) : []
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setStats({
        totalUsers: 0,
        totalShipments: 0,
        totalRevenue: 0,
        recentShipments: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.dashboard')}</h1>
        <p className="mt-1 text-sm text-gray-600">{t('admin.dashboardDesc')}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('admin.totalUsers')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <Link
            to="/admin/users"
            className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {t('admin.manageUsers')} →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('common.totalShipments')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalShipments}</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <Link
            to="/admin/shipments"
            className="mt-4 text-sm text-green-600 hover:text-green-700 font-medium"
          >
            {t('admin.manageShipments')} →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('admin.totalRevenue')}</p>
              <p className="text-2xl font-bold text-gray-900">
                ${typeof stats.totalRevenue === 'number' ? stats.totalRevenue.toFixed(2) : '0.00'}
              </p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('admin.analytics')}</p>
              <p className="text-2xl font-bold text-gray-900">{t('common.viewReports')}</p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <Link
            to="/analytics"
            className="mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            {t('admin.viewAnalytics')} →
          </Link>
        </div>
      </div>

      {/* Recent Shipments */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{t('admin.recentShipments')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('shipments.trackingNumber')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('shipments.serviceType')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('status.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('shipments.totalCost')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.createdAt')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentShipments.length > 0 ? (
                stats.recentShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {shipment.trackingNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {shipment.serviceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${shipment.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : ''}
                        ${shipment.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' : ''}
                        ${shipment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${shipment.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {t(`status.${shipment.status.toLowerCase()}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${parseFloat(shipment.totalCost).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(shipment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500">
                    {t('common.noShipments')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
