import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import InteractiveMap from './InteractiveMap';
import { MapPin, User, Phone, Mail, AlertTriangle } from 'lucide-react';

function HelpRequestForm({ onSubmit, initialData = null }) {
  const { state, actions } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'food',
    urgency: 'medium',
    location: null,
    contactInfo: '',
    requesterName: '',
    ...initialData
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (state.user.isAuthenticated) {
      setFormData(prev => ({
        ...prev,
        requesterName: state.user.name || '',
        contactInfo: state.user.email || ''
      }));
    }
  }, [state.user]);

  const categories = [
    { value: 'food', label: 'Food & Supplies', description: 'Groceries, meals, basic necessities' },
    { value: 'housing', label: 'Housing & Shelter', description: 'Temporary housing, shelter assistance' },
    { value: 'medical', label: 'Medical & Healthcare', description: 'Medical transport, healthcare support' },
    { value: 'transportation', label: 'Transportation', description: 'Rides, vehicle assistance' },
    { value: 'childcare', label: 'Childcare', description: 'Babysitting, child supervision' },
    { value: 'elderly', label: 'Elderly Care', description: 'Senior assistance, companionship' },
    { value: 'education', label: 'Education & Tutoring', description: 'Academic help, mentoring' },
    { value: 'other', label: 'Other', description: 'Other types of assistance' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low', description: 'Can wait a few days', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', description: 'Needed within 24-48 hours', color: 'text-yellow-600' },
    { value: 'high', label: 'High', description: 'Needed within a few hours', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical', description: 'Emergency - immediate help needed', color: 'text-red-600' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLocationSelect = (location) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...location,
        address: `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
      }
    }));
    
    if (errors.location) {
      setErrors(prev => ({
        ...prev,
        location: ''
      }));
    }
  };

  const handleLocationFound = (location) => {
    handleLocationSelect(location);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.location) {
      newErrors.location = 'Please select a location on the map';
    }

    if (!formData.requesterName.trim()) {
      newErrors.requesterName = 'Your name is required';
    }

    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'Contact information is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData = {
        ...formData,
        requester: {
          name: formData.requesterName,
          role: state.user.role || 'needsHelp'
        }
      };

      if (onSubmit) {
        await onSubmit(requestData);
      } else {
        actions.addHelpRequest(requestData);
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'food',
        urgency: 'medium',
        location: null,
        contactInfo: state.user.email || '',
        requesterName: state.user.name || ''
      });

    } catch (error) {
      actions.addNotification({
        type: 'error',
        message: 'Failed to create help request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Request Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Brief, clear title describing what help you need"
          className={`input-field ${errors.title ? 'border-red-300 focus:ring-red-500' : ''}`}
          maxLength={100}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">{formData.title.length}/100 characters</p>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Detailed Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Provide detailed information about what help you need, when you need it, and any specific requirements"
          rows={4}
          className={`input-field resize-none ${errors.description ? 'border-red-300 focus:ring-red-500' : ''}`}
          maxLength={500}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">{formData.description.length}/500 characters</p>
      </div>

      {/* Category and Urgency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="input-field"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            {categories.find(cat => cat.value === formData.category)?.description}
          </p>
        </div>

        {/* Urgency */}
        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
            Urgency Level *
          </label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleInputChange}
            className="input-field"
          >
            {urgencyLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          <p className={`mt-1 text-xs ${urgencyLevels.find(level => level.value === formData.urgency)?.color}`}>
            {urgencyLevels.find(level => level.value === formData.urgency)?.description}
          </p>
        </div>
      </div>

      {/* Location Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location *
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>Click on the map to select your location or use the location button</span>
          </div>
          <InteractiveMap
            helpRequests={[]}
            onLocationSelect={handleLocationSelect}
            selectedLocation={formData.location}
            height="300px"
            showLocationButton={true}
            onLocationFound={handleLocationFound}
            center={formData.location ? [formData.location.lat, formData.location.lng] : [40.7128, -74.0060]}
            zoom={formData.location ? 15 : 12}
          />
          {formData.location && (
            <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 p-2 rounded">
              <MapPin className="h-4 w-4" />
              <span>Location selected: {formData.location.address}</span>
            </div>
          )}
          {errors.location && (
            <p className="text-sm text-red-600">{errors.location}</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Requester Name */}
        <div>
          <label htmlFor="requesterName" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              id="requesterName"
              name="requesterName"
              value={formData.requesterName}
              onChange={handleInputChange}
              placeholder="Your full name"
              className={`input-field pl-10 ${errors.requesterName ? 'border-red-300 focus:ring-red-500' : ''}`}
            />
          </div>
          {errors.requesterName && (
            <p className="mt-1 text-sm text-red-600">{errors.requesterName}</p>
          )}
        </div>

        {/* Contact Info */}
        <div>
          <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-2">
            Contact Information *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              placeholder="Email or phone number"
              className={`input-field pl-10 ${errors.contactInfo ? 'border-red-300 focus:ring-red-500' : ''}`}
            />
          </div>
          {errors.contactInfo && (
            <p className="mt-1 text-sm text-red-600">{errors.contactInfo}</p>
          )}
        </div>
      </div>

      {/* Critical Urgency Warning */}
      {formData.urgency === 'critical' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-red-800">Critical Emergency</h4>
              <p className="text-sm text-red-700 mt-1">
                For life-threatening emergencies, please call emergency services (911) immediately. 
                This platform is for community assistance and may not provide immediate response.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="btn-secondary"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${formData.urgency === 'critical' ? 'btn-emergency' : 'btn-primary'} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? 'Creating Request...' : 'Create Help Request'}
        </button>
      </div>
    </form>
  );
}

export default HelpRequestForm;
