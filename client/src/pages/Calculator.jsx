import { useState } from 'react';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import { calculatorAPI } from '../services/api';
import { Calculator as CalculatorIcon, DollarSign } from 'lucide-react';

const Calculator = () => {
  const [formData, setFormData] = useState({
    weight: '',
    volume: '',
    value: '',
    serviceType: 'LCL',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await calculatorAPI.calculate(formData);
      setResult(response.data);
    } catch (err) {
      setError('Failed to calculate cost. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-100 p-4 rounded-full">
              <CalculatorIcon className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Import Cost Calculator</h1>
          <p className="text-gray-600 mt-2">
            Get an instant estimate of your import costs from China to Indonesia
          </p>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calculator Form */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipment Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="input"
                  placeholder="100"
                  step="0.01"
                  min="0.01"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter total weight in kilograms</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume (m³) *
                </label>
                <input
                  type="number"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  className="input"
                  placeholder="2.5"
                  step="0.001"
                  min="0.001"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter total volume in cubic meters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goods Value (USD) *
                </label>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  className="input"
                  placeholder="5000"
                  step="0.01"
                  min="0.01"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Declared value of goods in USD</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="LCL">LCL (Less Container Load)</option>
                  <option value="FCL">FCL (Full Container Load)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <CalculatorIcon className="h-5 w-5" />
                    <span>Calculate Cost</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Cost Estimation</h2>
            
            {!result ? (
              <div className="text-center py-12">
                <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Fill in the form and click calculate to see the cost estimation
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cost Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Freight Cost</span>
                    <span className="font-medium text-gray-900">
                      ${result.estimation.freightCost.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Customs Duty (7.5%)</span>
                    <span className="font-medium text-gray-900">
                      ${result.estimation.customsDuty.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">VAT (11%)</span>
                    <span className="font-medium text-gray-900">
                      ${result.estimation.vat.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Insurance (0.5%)</span>
                    <span className="font-medium text-gray-900">
                      ${result.estimation.insuranceCost.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Admin Fee</span>
                    <span className="font-medium text-gray-900">
                      ${result.estimation.adminFee.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-primary-50 rounded-lg p-4 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total Estimated Cost
                    </span>
                    <span className="text-2xl font-bold text-primary-600">
                      ${result.estimation.totalCost.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{result.currency}</p>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-xs text-yellow-800">
                    <strong>Note:</strong> {result.disclaimer}
                  </p>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Calculation Details
                  </h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>• Weight-based cost: ${result.estimation.breakdown.weightCost.toFixed(2)}</p>
                    <p>• Volume-based cost: ${result.estimation.breakdown.volumeCost.toFixed(2)}</p>
                    <p>• Charged based on: {result.estimation.freightCost === result.estimation.breakdown.weightCost ? 'Weight' : 'Volume'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">How is the cost calculated?</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• <strong>Freight Cost:</strong> Based on the higher value between weight and volume</p>
            <p>• <strong>Customs Duty:</strong> 7.5% of goods value (varies by product type)</p>
            <p>• <strong>VAT:</strong> 11% of total taxable amount</p>
            <p>• <strong>Insurance:</strong> 0.5% of goods value for protection</p>
            <p>• <strong>Admin Fee:</strong> Fixed processing and documentation fee</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
