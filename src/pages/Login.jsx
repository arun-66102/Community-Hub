import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Mail, UserCheck, Users, Heart } from 'lucide-react';

function Login() {
  const { actions } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'volunteer'
  });
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      value: 'volunteer',
      label: 'Volunteer',
      description: 'I want to help others in my community',
      icon: Heart
    },
    {
      value: 'ngo',
      label: 'NGO/Organization',
      description: 'I represent an organization that provides community services',
      icon: Users
    },
    {
      value: 'needsHelp',
      label: 'Need Help',
      description: 'I need assistance from the community',
      icon: UserCheck
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role
      };

      actions.loginUser(userData);
      actions.addNotification({
        type: 'success',
        message: `Welcome ${formData.name}! You're now logged in as a ${formData.role}.`
      });

      navigate('/');
    } catch (error) {
      actions.addNotification({
        type: 'error',
        message: 'Login failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Join Community Help Hub
          </h1>
          <p className="text-gray-600">
            Connect with your community and make a difference
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="input-field"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="input-field pl-10"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I am a...
            </label>
            <div className="space-y-3">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <label
                    key={role.value}
                    className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.role === role.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <IconComponent className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-gray-900">{role.label}</span>
                      </div>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.name || !formData.email}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Joining...' : 'Join Community'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            By joining, you agree to help build a supportive community and follow our community guidelines.
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">For Volunteers</h3>
          <p className="text-sm text-blue-800">
            Browse help requests, offer your skills, and make a direct impact in your community.
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-900 mb-2">For Organizations</h3>
          <p className="text-sm text-green-800">
            Coordinate larger relief efforts and connect with volunteers for your initiatives.
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-medium text-purple-900 mb-2">Need Help?</h3>
          <p className="text-sm text-purple-800">
            Create requests for assistance and connect with caring community members.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
