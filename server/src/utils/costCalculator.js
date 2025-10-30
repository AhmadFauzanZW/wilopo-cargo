/**
 * Calculate import cost estimation
 * @param {Object} params - Calculation parameters
 * @param {number} params.weight - Weight in kg
 * @param {number} params.volume - Volume in m³
 * @param {number} params.value - Goods value in USD
 * @param {string} params.serviceType - LCL or FCL
 * @returns {Object} Cost breakdown
 */
const calculateImportCost = ({ weight, volume, value, serviceType = 'LCL' }) => {
  // Base rates (example pricing - adjust based on actual Wilopo Cargo rates)
  const FREIGHT_RATE_PER_KG = 8; // USD per kg
  const FREIGHT_RATE_PER_CBM = 150; // USD per cubic meter
  const CUSTOMS_DUTY_RATE = 0.075; // 7.5% of goods value
  const VAT_RATE = 0.11; // 11% VAT
  const ADMIN_FEE = 50; // USD
  const INSURANCE_RATE = 0.005; // 0.5% of goods value

  // Calculate freight cost (higher of weight or volume)
  const weightCost = weight * FREIGHT_RATE_PER_KG;
  const volumeCost = volume * FREIGHT_RATE_PER_CBM;
  const freightCost = Math.max(weightCost, volumeCost);

  // Calculate duties and taxes
  const customsDuty = value * CUSTOMS_DUTY_RATE;
  const insuranceCost = value * INSURANCE_RATE;
  const taxableAmount = value + freightCost + insuranceCost + customsDuty;
  const vat = taxableAmount * VAT_RATE;

  // Total cost
  const totalCost = freightCost + customsDuty + vat + insuranceCost + ADMIN_FEE;

  return {
    freightCost: Math.round(freightCost * 100) / 100,
    customsDuty: Math.round(customsDuty * 100) / 100,
    vat: Math.round(vat * 100) / 100,
    insuranceCost: Math.round(insuranceCost * 100) / 100,
    adminFee: ADMIN_FEE,
    totalCost: Math.round(totalCost * 100) / 100,
    breakdown: {
      weightCost: Math.round(weightCost * 100) / 100,
      volumeCost: Math.round(volumeCost * 100) / 100,
      chargeableWeight: weight,
      chargeableVolume: volume,
    }
  };
};

module.exports = { calculateImportCost };
