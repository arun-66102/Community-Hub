import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Mail, 
  MapPin, 
  Heart, 
  Users, 
  UserCheck, 
  Edit3, 
  Save, 
  X,
  Calendar,
  Award
} from 'lucide-react';

function Profile() {
  const { state, actions } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: state.user.name || '',
    email: state.user.email || '',
    role: state.user.role || 'volunteer'
  });

  const roles = [
    { value: 'volunteer', label: 'Volunteer', icon: Heart },
    { value: 'ngo', label: 'NGO/Organization', icon: Users },
    { value: 'needsHelp', label: 'Need Help', icon: UserCheck }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    actions.setUser(editForm);
    setIsEditing(false);
    actions.addNotification({
      type: 'success',
      message: 'Profile updated successfully!'
    });
  };

  const handleCancel = () => {
    setEditForm({
      name: state.user.name || '',
      email: state.user.email || '',
      role: state.user.role || 'volunteer'
    });
    setIsEditing(false);
  };

  const getUserStats = () => {
    const userRequests = state.helpRequests.filter(r => r.requester.name === state.user.name);
    const volunteeredRequests = state.helpRequests.filter(r => 
      r.volunteers.some(v => v.id === state.user.id)
    );
    
    return {
      requestsCreated: userRequests.length,
      volunteeredFor: volunteeredRequests.length,
      completedRequests: userRequests.filter(r => r.status === 'completed').length
    };
  };

  const stats = getUserStats();

  if (!state.user.isAuthenticated) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Not Logged In</h2>
        <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
        <button
          onClick={() => window.location.href = '/login'}
          className="btn-primary"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {state.user.name}
              </h1>
              <p className="text-gray-600 capitalize">
                {roles.find(r => r.value === state.user.role)?.label}
              </p>
            </div>
          </div>
          
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                className="input-field"
              />
            ) : (
              <p className="text-gray-900">{state.user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleInputChange}
                className="input-field"
              />
            ) : (
              <p className="text-gray-900">{state.user.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            {isEditing ? (
              <select
                name="role"
                value={editForm.role}
                onChange={handleInputChange}
                className="input-field"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-900 capitalize">
                {roles.find(r => r.value === state.user.role)?.label}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Member Since
            </label>
            <p className="text-gray-900">
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.requestsCreated}</p>
              <p className="text-sm text-gray-600">Requests Created</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.volunteeredFor}</p>
              <p className="text-sm text-gray-600">Volunteered For</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.completedRequests}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        
        <div className="space-y-4">
          {/* User's created requests */}
          {state.helpRequests
            .filter(r => r.requester.name === state.user.name)
            .slice(0, 3)
            .map(request => (
              <div key={request.id} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Created help request</p>
                  <p className="text-sm text-gray-600">{request.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}

          {/* Volunteered requests */}
          {state.helpRequests
            .filter(r => r.volunteers.some(v => v.id === state.user.id))
            .slice(0, 3)
            .map(request => (
              <div key={`vol-${request.id}`} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <Heart className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Volunteered to help</p>
                  <p className="text-sm text-gray-600">{request.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Requested by {request.requester.name}
                  </p>
                </div>
              </div>
            ))}

          {stats.requestsCreated === 0 && stats.volunteeredFor === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No activity yet. Start by creating a help request or volunteering!</p>
            </div>
          )}
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h2>
        <div className="space-y-3">
          <button
            onClick={() => actions.logoutUser()}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
