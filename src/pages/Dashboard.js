import React, { useEffect, useState } from 'react';
import { deleteDocumentDataFlower, getDocumentDataFlower } from '../dataflower';
import { Loader2, Trash2, Edit2, LogOut, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import UpdateModal from '../components/UpdateModal';
import { updateDocumentDataFlower } from '../dataflower';
import { logOutUserDataFlower } from '../utils/utils';
import ConfirmationModal from '../components/ConfirmationModal';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [userName, setUserName] = useState('')
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleLogOut = async () => {
    const logout = await logOutUserDataFlower();
    if (logout) {
      navigate('/');
      console.log('Logged out');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDeleteData(deleteItemId);
      setIsDeleteModalOpen(false);
      setDeleteItemId(null);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (userSession && userSession.username) {
      setUserName(userSession.username);
    }
  }, []);


  const handleUpdate = (doc) => {
    setCurrentDoc(doc);
    setIsModalOpen(true);
  };

  const handleDeleteData = async (docId) => {
    try {
      const deleteDoc = await deleteDocumentDataFlower(docId);
      if (deleteDoc) {
        alert('Document Deleted');
        setDocuments(documents.filter(doc => doc.id !== docId)); // Update the UI after deletion
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async (docId, task, description, dueDate, notes, progress, category, status, size) => {
    try {
      const updatedDoc = await updateDocumentDataFlower(docId, task, description, dueDate, notes, progress, category, status, size);
      if (updatedDoc) {
        alert('Document updated successfully');
        setIsModalOpen(false);
        setDocuments(
          documents.map((doc) => (doc.id === docId ? updatedDoc.data : doc)) // Update the list with the new document
        );
      }
    } catch (err) {
      console.log('Error updating document:', err);
    }
  };

  const addNewDocument = (newDoc) => {
    setDocuments((prevDocs) => [newDoc, ...prevDocs]); // Add the new document to the list
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await getDocumentDataFlower();
      if (response && response.data) {
        // Filter documents by userName
        const userDocuments = response.data.filter(doc => doc.userName === userName);
        setDocuments(userDocuments);
      } else {
        console.error('No data found in the response');
      }
    };

    fetchDocuments();
  }, [userName]); // Add userName as a dependency to fetch documents when it changes

  const getStatusColor = (status) => {
    const colors = {
      'Not Started': 'bg-gray-100 text-gray-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Launched': 'bg-green-100 text-green-800',
      'Blocked': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Project Tracker</h1>
            <p className="text-gray-500">Welcome back, {userName}</p>
          </div>
          <button
            onClick={handleLogOut}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </button>
        </div>

        {/* Input Form */}
        <div className="mb-8">
          <InputForm addNewDocument={addNewDocument} />
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.length > 0 ? (
              documents.map((doc) => (
                doc?.task && (
                  <div key={doc.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold text-gray-900">{doc.task}</h3>
                          <p className="text-sm text-gray-500">{doc.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={() => handleUpdate(doc)}
                          >
                            <Edit2 className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            className="p-1 hover:bg-red-100 rounded-full transition-colors"
                            onClick={() => handleDeleteClick(doc.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Due: {new Date(doc.dueDate).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{doc.progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all"
                              style={{ width: `${doc.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {doc.category}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {doc.size}
                          </span>
                        </div>

                        {doc.notes && (
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {doc.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-4" />
                <p className="text-gray-600">Loading projects...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <UpdateModal
        doc={currentDoc}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  );

};

export default Dashboard;
