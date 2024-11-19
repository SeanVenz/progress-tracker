import React, { useState, useEffect } from 'react';
import { Upload, Loader2, X } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
import { addDocumentDataFlower, uploadFileDataFlower } from '../dataflower';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (userSession?.username) {
      setUsername(userSession.username);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setError('File size should be less than 10MB');
        e.target.value = '';
        return;
      }
      setSelectedFile(file);
      setError('');
      setSuccess('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    if (!username) {
      setError('Username not found. Please log in again.');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Creating document with data:', {
        task: selectedFile.name,
        description: 'File upload',
        date: new Date().toISOString().split('T')[0],
        username
      });

      // First create a document entry
      const newDoc = await addDocumentDataFlower(
        selectedFile.name, // task name
        'File upload', // description
        new Date().toISOString().split('T')[0], // today's date
        'File upload through FileUploader component', // notes
        0, // progress
        'Documentation', // category
        'Not Started', // status
        'M', // size
        username
      );

      console.log('Document creation response:', newDoc);

      if (!newDoc) {
        throw new Error('Document creation failed - no response received');
      }

      if (!newDoc.id) {
        throw new Error(`Document creation failed - no ID received. Response: ${JSON.stringify(newDoc)}`);
      }

      console.log('Starting file upload with document ID:', newDoc.id);

      // Then upload the file using the document ID
      const uploadResult = await uploadFileDataFlower('ae659f34-3fa4-42ba-b5f5-81b355b89551', 'attachment', selectedFile);
      
      console.log('File upload result:', uploadResult);

      if (!uploadResult) {
        throw new Error('File upload failed - no response received');
      }

      setSuccess('File uploaded successfully!');
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      console.error('Full error details:', err);
      setError(err.message || 'Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError('');
    setSuccess('');
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">File Upload</h3>
        <p className="text-sm text-gray-500">Select and upload your file</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {selectedFile && (
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600 truncate max-w-[200px]">
              {selectedFile.name}
            </span>
            <button
              onClick={clearFile}
              className="p-1 hover:bg-gray-200 rounded-full"
              type="button"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}

        {/* {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 text-green-700 border-green-200">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )} */}

        <button
          onClick={handleUpload}
          disabled={isUploading || !selectedFile}
          type="button"
          className={`
            w-full inline-flex items-center justify-center px-4 py-2 rounded-lg text-white
            ${isUploading || !selectedFile ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Upload File
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FileUploader;