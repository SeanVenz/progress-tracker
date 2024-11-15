import React from 'react';
import { AlertCircle, Check, X } from 'lucide-react';

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in duration-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {title || 'Confirm Deletion'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {message || 'Are you sure you want to delete this item? This action cannot be undone.'}
            </p>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 
            text-gray-700 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 
            text-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Check className="w-4 h-4 mr-2" />
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;