import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Package, TrendingUp, Clock, DollarSign } from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const Analytics = () => {
  const { t } = useTranslation();
  const [overview, setOverview] = useState(null);
  const [trends, setTrends] = useState([]);
  const [revenue, setRevenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [overviewRes, trendsRes, revenueRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/analytics/overview`, config),
        axios.get(`${import.meta.env.VITE_API_URL}/analytics/trends`, config),
        axios.get(`${import.meta.env.VITE_API_URL}/analytics/revenue`, config)
      ]);

      setOverview(overviewRes.data);
      setTrends(trendsRes.data.slice(-15)); // Last 15 days
      setRevenue(revenueRes.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setOverview({ totalShipments: 0, avgDeliveryTime: 0, shipmentsByStatus: [] });
      setTrends([]);
      setRevenue({ totalRevenue: 0, growth: 0, revenueByService: [] });
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
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.analytics')}</h1>
          <p className="mt-1 text-sm text-gray-600">{t('admin.analyticsDesc')}</p>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('common.totalShipments')}</p>
              <p className="text-2xl font-bold text-gray-900">{overview?.totalShipments || 0}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('admin.totalRevenue')}</p>
              <p className="text-2xl font-bold text-gray-900">
                ${typeof revenue?.totalRevenue === 'number' 
                  ? revenue.totalRevenue.toFixed(2) 
                  : '0.00'}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('admin.avgDeliveryTime')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {overview?.avgDeliveryTime 
                  ? Math.round(overview.avgDeliveryTime) 
                  : 0} {t('common.days')}
              </p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('admin.monthlyGrowth')}</p>
              <p className={`text-2xl font-bold ${
                (revenue?.growth || 0) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {typeof revenue?.growth === 'number' 
                  ? revenue.growth.toFixed(1) 
                  : '0.0'}%
              </p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipments by Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('admin.shipmentsByStatus')}
          </h3>
          {overview?.shipmentsByStatus && overview.shipmentsByStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={overview.shipmentsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, count }) => `${status}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {overview.shipmentsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>{t('common.noData')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Revenue by Service */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('admin.revenueByService')}
          </h3>
          {revenue?.revenueByService && revenue.revenueByService.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenue.revenueByService}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="serviceType" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Bar dataKey="revenue" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              <div className="text-center">
                <DollarSign className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>{t('common.noData')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Shipment Trends */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('admin.shipmentTrends')} ({t('common.last15Days')})
          </h3>
          {trends && trends.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="PENDING" stroke="#F59E0B" name="Pending" strokeWidth={2} />
                <Line type="monotone" dataKey="IN_TRANSIT" stroke="#3B82F6" name="In Transit" strokeWidth={2} />
                <Line type="monotone" dataKey="DELIVERED" stroke="#10B981" name="Delivered" strokeWidth={2} />
                <Line type="monotone" dataKey="CANCELLED" stroke="#EF4444" name="Cancelled" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>{t('common.noData')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Revenue by Month */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('admin.revenueByMonth')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overview?.revenueByMonth || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
