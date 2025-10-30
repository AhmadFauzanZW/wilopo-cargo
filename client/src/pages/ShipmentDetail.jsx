import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import { shipmentsAPI, documentsAPI } from '../services/api';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Weight,
  Box,
  DollarSign,
  Upload,
  FileText,
  Download,
  Trash2,
  CheckCircle2,
} from 'lucide-react';

const ShipmentDetail = () => {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchShipment();
  }, [id]);

  const fetchShipment = async () => {
    try {
      setLoading(true);
      const response = await shipmentsAPI.getById(id);
      setShipment(response.data);
    } catch (err) {
      setError('Failed to load shipment details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', 'OTHER');

      await documentsAPI.upload(id, formData);
      setSuccess('Document uploaded successfully');
      fetchShipment(); // Refresh to show new document
    } catch (err) {
      setError('Failed to upload document');
      console.error(err);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDeleteDocument = async (docId) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      await documentsAPI.delete(docId);
      setSuccess('Document deleted successfully');
      fetchShipment();
    } catch (err) {
      setError('Failed to delete document');
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  if (!shipment) {
    return (
      <Layout>
        <Alert type="error" message="Shipment not found" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {shipment.trackingNumber}
              </h1>
              <p className="text-gray-600 mt-1">Shipment Details</p>
            </div>
          </div>
          <StatusBadge status={shipment.status} />
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}
        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipment Info */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Origin</p>
                    <p className="font-medium text-gray-900">{shipment.origin}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Destination</p>
                    <p className="font-medium text-gray-900">{shipment.destination}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Weight className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="font-medium text-gray-900">{shipment.weight} kg</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Box className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Volume</p>
                    <p className="font-medium text-gray-900">{shipment.volume} m³</p>
                  </div>
                </div>
                {shipment.estimatedCost && (
                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Estimated Cost</p>
                      <p className="font-medium text-gray-900">${shipment.estimatedCost}</p>
                    </div>
                  </div>
                )}
                {shipment.estimatedArrival && (
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Estimated Arrival</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(shipment.estimatedArrival)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Status Timeline</h2>
              <div className="space-y-4">
                {[...shipment.statusHistory].reverse().map((history, index) => (
                  <div key={history.id} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className={`rounded-full p-2 ${
                        index === 0 ? 'bg-primary-100' : 'bg-gray-100'
                      }`}>
                        <CheckCircle2 className={`h-5 w-5 ${
                          index === 0 ? 'text-primary-600' : 'text-gray-400'
                        }`} />
                      </div>
                      {index < shipment.statusHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">
                          {history.status.replace(/_/g, ' ')}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(history.timestamp)}
                        </span>
                      </div>
                      {history.description && (
                        <p className="text-sm text-gray-600 mt-1">{history.description}</p>
                      )}
                      {history.location && (
                        <p className="text-sm text-gray-500 mt-1">📍 {history.location}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Documents */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents</h2>
              
              {/* Upload */}
              <div className="mb-4">
                <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
                  <Upload className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-600">
                    {uploadLoading ? 'Uploading...' : 'Upload Document'}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={uploadLoading}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
              </div>

              {/* Document List */}
              <div className="space-y-2">
                {shipment.documents.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No documents uploaded yet
                  </p>
                ) : (
                  shipment.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">
                          {doc.originalName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 ml-2">
                        <a
                          href={`http://localhost:5000${doc.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Contact Info */}
            {(shipment.receiverName || shipment.receiverPhone) && (
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Receiver Information</h2>
                <div className="space-y-3">
                  {shipment.receiverName && (
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{shipment.receiverName}</p>
                    </div>
                  )}
                  {shipment.receiverPhone && (
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{shipment.receiverPhone}</p>
                    </div>
                  )}
                  {shipment.receiverAddress && (
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium text-gray-900">{shipment.receiverAddress}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShipmentDetail;
