const StatusBadge = ({ status }) => {
  const statusConfig = {
    PICKED_UP: { color: 'bg-blue-100 text-blue-800', label: 'Picked Up' },
    IN_WAREHOUSE: { color: 'bg-purple-100 text-purple-800', label: 'In Warehouse' },
    IN_TRANSIT: { color: 'bg-yellow-100 text-yellow-800', label: 'In Transit' },
    AT_PORT: { color: 'bg-orange-100 text-orange-800', label: 'At Port' },
    CUSTOMS_CLEARANCE: { color: 'bg-indigo-100 text-indigo-800', label: 'Customs Clearance' },
    OUT_FOR_DELIVERY: { color: 'bg-cyan-100 text-cyan-800', label: 'Out for Delivery' },
    DELIVERED: { color: 'bg-green-100 text-green-800', label: 'Delivered' },
    CANCELLED: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
  };

  const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
