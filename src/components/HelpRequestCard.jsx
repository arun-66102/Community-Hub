import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  User, 
  Users, 
  Heart,
  Home,
  Stethoscope,
  ShoppingBag,
  Car,
  Baby,
  UserCheck,
  BookOpen,
  HelpCircle
} from 'lucide-react';

function HelpRequestCard({ request, onVolunteer, showVolunteerButton = true }) {
  const getCategoryIcon = (category) => {
    const iconProps = { className: "h-4 w-4" };
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
        return 'urgency-critical border-l-4 border-l-red-500';
      case 'high':
        return 'urgency-high border-l-4 border-l-orange-500';
      case 'medium':
        return 'urgency-medium border-l-4 border-l-yellow-500';
      case 'low':
        return 'urgency-low border-l-4 border-l-green-500';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800 border-l-4 border-l-gray-500';
    }
  };

  const getUrgencyBadgeStyles = (urgency) => {
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

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const handleVolunteerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onVolunteer) {
      onVolunteer(request.id);
    }
  };

  return (
    <div className={`card hover:shadow-lg transition-shadow duration-200 ${getUrgencyStyles(request.urgency)}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <Link 
            to={`/request/${request.id}`}
            className="block hover:text-primary-600 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
              {request.title}
            </h3>
          </Link>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <User className="h-3 w-3" />
            <span>{request.requester.name}</span>
            <span>•</span>
            <Clock className="h-3 w-3" />
            <span>{formatTimeAgo(request.createdAt)}</span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2 ml-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyBadgeStyles(request.urgency)}`}>
            {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(request.status)}`}>
            {request.status.replace('_', ' ').charAt(0).toUpperCase() + request.status.replace('_', ' ').slice(1)}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {truncateText(request.description)}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {getCategoryIcon(request.category)}
            <span className="capitalize">{request.category}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>{request.location.address}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="h-3 w-3" />
          <span>{request.volunteers.length} volunteer{request.volunteers.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <Link 
          to={`/request/${request.id}`}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
        >
          View Details →
        </Link>
        
        {showVolunteerButton && request.status === 'open' && (
          <button
            onClick={handleVolunteerClick}
            className="flex items-center space-x-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            <Heart className="h-3 w-3" />
            <span>Volunteer</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default HelpRequestCard;
