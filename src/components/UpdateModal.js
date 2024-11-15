import React, { useState, useEffect } from 'react';
import { Send, Loader2, Calendar, FileText, Tag } from 'lucide-react';

const UpdateModal = ({ doc, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    task: '',
    notes: '',
    description: '',
    dueDate: '',
    progress: 0,
    category: '',
    status: '',
    size: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && doc) {
      setFormData({
        task: doc.task || '',
        notes: doc.notes || '',
        description: doc.description || '',
        dueDate: doc.dueDate || '',
        progress: Number(doc.progress) || 0,
        category: doc.category || '',
        status: doc.status || '',
        size: doc.size || ''
      });
    }
  }, [isOpen, doc]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(
        doc.id,
        formData.task,
        formData.description,
        formData.dueDate,
        formData.notes,
        formData.progress,
        formData.category,
        formData.status,
        formData.size
      );
      onClose();
    } catch (error) {
      console.error('Error updating document:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-3xl">
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">Update Project</h2>
            <p className="text-sm text-gray-500">Modify the project details and track its progress</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Project Name</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text"
                    value={formData.task}
                    onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    placeholder="Enter project name"
                  />
                </div>
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    placeholder="Brief description"
                  />
                </div>
              </div>

              {/* Due Date Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Due Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  />
                </div>
              </div>

              {/* Progress Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Progress</label>
                <div className="space-y-2">
                  <div className="relative pt-1">
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-sm font-medium text-gray-700">{formData.progress}%</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${formData.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                >
                  <option value="">Select Category</option>
                  {['Bug', 'Enhancement', 'High Prio', 'Wont Fix', 'Low Prio', 'Task', 'Documentation', 'Graphics', 'Design Planning']
                    .map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))
                  }
                </select>
              </div>

              {/* Status Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                >
                  <option value="">Select Status</option>
                  {['Not Started', 'In Progress', 'Launched', 'Blocked']
                    .map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))
                  }
                </select>
              </div>

              {/* Notes Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Notes</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    placeholder="Enter notes"
                  />
                </div>
              </div>

              {/* Size Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Size</label>
                <select 
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                >
                  <option value="">Select Size</option>
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL']
                    .map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  inline-flex items-center px-6 py-3 rounded-lg text-white
                  ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
                  transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                `}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                {isSubmitting ? 'Updating...' : 'Update Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;