import React, { useState } from 'react';
import { addDocumentWithRelationship } from '../appwrite';
import { Upload, Send } from 'lucide-react';

function InputForm() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile?.name || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDocumentWithRelationship(title, year, author, message, file);
      // Reset form
      setTitle('');
      setYear('');
      setAuthor('');
      setMessage('');
      setFile(null);
      setFileName('');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Document</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter document title"
              />
            </div>

            {/* Year Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input 
                type="number" 
                value={year}
                onChange={(e) => setYear(e.target.value)} 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter year"
              />
            </div>

            {/* Author Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input 
                type="text" 
                value={author}
                onChange={(e) => setAuthor(e.target.value)} 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter author name"
              />
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)} 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your message"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-2 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                {fileName && (
                  <p className="text-sm text-gray-600 truncate">
                    Selected: {fileName}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                inline-flex items-center px-6 py-3 rounded-lg text-white
                ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              `}
            >
              <Send className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit Document'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputForm;