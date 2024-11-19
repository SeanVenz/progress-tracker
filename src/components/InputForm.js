import React, { useEffect, useState } from 'react';
import { Send, Loader2, Calendar, FileText, Tag, Upload } from 'lucide-react';
import { addDocumentDataFlower } from '../dataflower';

function InputForm({ addNewDocument }) {
  const [formData, setFormData] = useState({
    task: '',
    notes: '',
    description: '',
    dueDate: '',
    progress: 0,
    category: '',
    status: '',
    size: '',
    userName: '',
    attachments: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (userSession?.username) {
      setFormData(prev => ({ ...prev, userName: userSession.username }));
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, attachments: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newDoc = await addDocumentDataFlower(formData);
      addNewDocument(newDoc);
      setFormData({
        task: '', 
        notes: '', 
        description: '', 
        dueDate: '', 
        progress: 0, 
        category: '', 
        status: '', 
        size: '',
        attachments: null
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Add New Project</h2>
          <p className="text-sm text-gray-500">Create a new project and track its progress</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous form fields remain the same */}
            {/* ... */}

            {/* New File Upload Field */}
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-semibold text-gray-700">Attachments</label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
                {formData.attachments && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected file: {formData.attachments.name}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
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
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputForm;