import { AlertCircle } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose }) => {
  const types = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div className={`border rounded-lg p-4 flex items-start space-x-3 ${types[type]}`}>
      <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-sm font-medium hover:underline">
          Dismiss
        </button>
      )}
    </div>
  );
};

export default Alert;
