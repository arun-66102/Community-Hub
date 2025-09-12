import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import HelpRequestForm from '../components/HelpRequestForm';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

function CreateRequest() {
  const { state } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (requestData) => {
    // The form component handles the actual submission
    // After successful submission, redirect to home
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Help Request
        </h1>
        <p className="text-gray-600">
          Describe what help you need and connect with volunteers in your community.
        </p>
      </div>

      {/* Authentication Check */}
      {!state.user.isAuthenticated && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Authentication Required</h4>
              <p className="text-sm text-yellow-700 mt-1">
                You need to be logged in to create a help request. This helps us verify requests and enables direct communication with volunteers.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="mt-3 text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition-colors"
              >
                Login to Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <HelpRequestForm onSubmit={handleSubmit} />
      </div>

      {/* Guidelines */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-4">Guidelines for Help Requests</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Be specific and clear about what help you need
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Provide accurate location information for local volunteers
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Set appropriate urgency levels - reserve "Critical" for true emergencies
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Include reliable contact information for volunteers to reach you
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Update your request status when help is received or no longer needed
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CreateRequest;
