import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import InteractiveMap from '../components/InteractiveMap';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  User, 
  Users, 
  Heart,
  Phone,
  Mail,
  Calendar,
  Tag,
  AlertTriangle,
  CheckCircle,
  Home,
  Stethoscope,
  ShoppingBag,
  Car,
  Baby,
  UserCheck,
  BookOpen,
  HelpCircle
} from 'lucide-react';

function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [isVolunteering, setIsVolunteering] = useState(false);

  const request = state.helpRequests.find(r => r.id === id);

  if (!request) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Request Not Found</h2>
        <p className="text-gray-600 mb-6">The help request you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const getCategoryIcon = (category) => {
    const iconProps = { className: "h-5 w-5" };
    switch (category) {
      case 'housing':
        return <Home {...iconProps} />;
      case 'medical':
        return <Stethoscope {...iconProps} />;
      case 'food':
        return <ShoppingBag {...iconProps} />;
      case 'transportation':
        return <Car {...iconProps} />;
      case 'childcare':
        return <Baby {...iconProps} />;
      case 'elderly':
        return <UserCheck {...iconProps} />;
      case 'education':
        return <BookOpen {...iconProps} />;
      default:
        return <HelpCircle {...iconProps} />;
    }
  };

  const getUrgencyStyles = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleVolunteer = async () => {
    if (!state.user.isAuthenticated) {
      actions.addNotification({
        type: 'warning',
        message: 'Please log in to volunteer for help requests.'
      });
      navigate('/login');
      return;
    }

    setIsVolunteering(true);

    try {
      const volunteer = {
        id: state.user.id,
        name: state.user.name,
        role: state.user.role,
        contactInfo: state.user.email || 'No contact info provided'
      };

      actions.volunteerForRequest(request.id, volunteer);
    } catch (error) {
      actions.addNotification({
        type: 'error',
        message: 'Failed to volunteer. Please try again.'
      });
    } finally {
      setIsVolunteering(false);
    }
  };

  const isUserVolunteered = state.user.isAuthenticated && 
    request.volunteers.some(v => v.id === state.user.id);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {request.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{request.requester.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(request.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyStyles(request.urgency)}`}>
                  {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(request.status)}`}>
                  {request.status.replace('_', ' ').charAt(0).toUpperCase() + request.status.replace('_', ' ').slice(1)}
                </span>
              </div>
            </div>

            {/* Category and Location */}
            <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                {getCategoryIcon(request.category)}
                <span className="capitalize">{request.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{request.location.address}</span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {request.description}
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
            <InteractiveMap
              helpRequests={[request]}
              center={[request.location.lat, request.location.lng]}
              zoom={15}
              height="300px"
            />
          </div>

          {/* Volunteers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Volunteers ({request.volunteers.length})
              </h3>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            
            {request.volunteers.length > 0 ? (
              <div className="space-y-3">
                {request.volunteers.map((volunteer, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{volunteer.name}</p>
                      <p className="text-sm text-gray-600 capitalize">{volunteer.role}</p>
                    </div>
                    {volunteer.contactInfo && (
                      <div className="text-sm text-gray-500">
                        {volunteer.contactInfo.includes('@') ? (
                          <Mail className="h-4 w-4" />
                        ) : (
                          <Phone className="h-4 w-4" />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No volunteers yet. Be the first to help!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Take Action</h3>
            
            {request.status === 'open' && !isUserVolunteered ? (
              <button
                onClick={handleVolunteer}
                disabled={isVolunteering}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVolunteering ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Volunteering...
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    Volunteer to Help
                  </>
                )}
              </button>
            ) : isUserVolunteered ? (
              <div className="text-center py-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="text-green-700 font-medium">You're volunteering for this request</p>
                <p className="text-sm text-gray-600 mt-1">Thank you for helping!</p>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600">This request is no longer accepting volunteers</p>
              </div>
            )}

            {!state.user.isAuthenticated && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  Login to volunteer and help your community
                </p>
                <Link to="/login" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Login →
                </Link>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{request.requester.name}</p>
                  <p className="text-sm text-gray-600 capitalize">{request.requester.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {request.contactInfo.includes('@') ? (
                  <Mail className="h-5 w-5 text-gray-400" />
                ) : (
                  <Phone className="h-5 w-5 text-gray-400" />
                )}
                <p className="text-gray-700">{request.contactInfo}</p>
              </div>
            </div>
            
            {(isUserVolunteered || state.user.role === 'ngo') && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  Contact information is visible because you're volunteering for this request.
                </p>
              </div>
            )}
          </div>

          {/* Request Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Request Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium capitalize">{request.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Urgency:</span>
                <span className={`font-medium capitalize ${
                  request.urgency === 'critical' ? 'text-red-600' :
                  request.urgency === 'high' ? 'text-orange-600' :
                  request.urgency === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {request.urgency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium capitalize">{request.status.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="font-medium">{new Date(request.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Volunteers:</span>
                <span className="font-medium">{request.volunteers.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestDetails;
