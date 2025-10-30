const { calculateImportCost } = require('../utils/costCalculator');

/**
 * @desc    Calculate import cost estimation
 * @route   POST /api/calculate-cost
 * @access  Public
 */
const calculateCost = async (req, res) => {
  try {
    const { weight, volume, value, serviceType } = req.body;

    // Validation
    if (!weight || !volume || !value) {
      return res.status(400).json({ 
        message: 'Please provide weight, volume, and value' 
      });
    }

    // Parse values
    const params = {
      weight: parseFloat(weight),
      volume: parseFloat(volume),
      value: parseFloat(value),
      serviceType: serviceType || 'LCL',
    };

    // Validate parsed values
    if (params.weight <= 0 || params.volume <= 0 || params.value <= 0) {
      return res.status(400).json({ 
        message: 'Weight, volume, and value must be positive numbers' 
      });
    }

    // Calculate cost
    const costEstimation = calculateImportCost(params);

    res.json({
      input: params,
      estimation: costEstimation,
      currency: 'USD',
      disclaimer: 'This is an estimation. Actual costs may vary based on specific circumstances.',
    });
  } catch (error) {
    console.error('Calculate cost error:', error);
    res.status(500).json({ message: 'Server error calculating cost' });
  }
};

module.exports = {
  calculateCost,
};
