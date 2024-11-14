import React, { useEffect, useState } from 'react';
import { getDocumentWithRelationship, updateDocumentWithRelationship, deleteDocumentWithRelationship, logoutUser } from '../appwrite';
import InputForm from '../components/InputForm';
import UpdateModal from '../components/UpdateModal';
import { useNavigate } from 'react-router-dom';
import { Loader2, Trash2, Edit2, LogOut } from 'lucide-react';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [currentReview, setCurrentReview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      const test = await getDocumentWithRelationship();
      setDocuments(test.documents);
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (docId) => {
    const confirmed = window.confirm('Are you sure you want to delete this document?');
    if (confirmed) {
      const response = await deleteDocumentWithRelationship(docId);
      if (response) {
        setDocuments(documents.filter((doc) => doc.$id !== docId));
      }
    }
  };

  const handleUpdate = (doc, review) => {
    setCurrentDoc(doc);
    setCurrentReview(review);
    setIsModalOpen(true);
  };

  const saveUpdatedDocument = async (docId, title, year, author, message, file) => {
    const response = await updateDocumentWithRelationship(docId, title, year, author, message, file);
    if (response) {
      setDocuments(
        documents.map((doc) =>
          doc.$id === docId
            ? { ...doc, title, year, reviews: [{ author, message }], url: response.url || doc.url }
            : doc
        )
      );
    }
  };

  const handleLogOut = async () => {
    const logout = await logoutUser();
    if(logout){
        navigate('/')
        console.log('here');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Document Dashboard</h1>
          <button 
            onClick={handleLogOut}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </button>
        </div>

        {/* Input Form Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <InputForm />
        </div>

        {/* Documents Grid */}
        <div className="space-y-6">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <div 
                key={doc.$id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {doc.title} <span className="text-gray-500">({doc.year})</span>
                      </h3>
                    </div>
                    <button
                      onClick={() => handleDelete(doc.$id)}
                      className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Document Image */}
                  <div className="aspect-video bg-gray-100 rounded-lg mb-6 overflow-hidden">
                    {doc.url ? (
                      <img
                        src={doc.url}
                        alt={doc.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No image available
                      </div>
                    )}
                  </div>

                  {/* Reviews Section */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Reviews</h4>
                    {doc.reviews && doc.reviews.length > 0 ? (
                      <div className="space-y-3">
                        {doc.reviews.map((review) => (
                          <div 
                            key={review.$id}
                            className="flex justify-between items-start bg-gray-50 p-4 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-gray-900">{review.author}</p>
                              <p className="text-gray-600 mt-1">{review.message}</p>
                            </div>
                            <button
                              onClick={() => handleUpdate(doc, review)}
                              className="inline-flex items-center text-yellow-600 hover:text-yellow-700 transition-colors"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No reviews available.</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-4" />
              <p className="text-gray-600">Loading documents...</p>
            </div>
          )}
        </div>
      </div>

      {/* Update Modal */}
      <UpdateModal
        doc={currentDoc}
        review={currentReview}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveUpdatedDocument}
      />
    </div>
  );
};

export default Dashboard;