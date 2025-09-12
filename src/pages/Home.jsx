import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import FilterSystem from '../components/FilterSystem';
import HelpRequestList from '../components/HelpRequestList';
import InteractiveMap from '../components/InteractiveMap';
import { 
  Search, 
  Plus, 
  Heart, 
  Users, 
  MapPin, 
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';

function Home() {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  const handleMarkerClick = (request) => {
    window.location.href = `/request/${request.id}`;
  };

  const getStats = () => {
    const total = state.helpRequests.length;
    const open = state.helpRequests.filter(r => r.status === 'open').length;
    const critical = state.helpRequests.filter(r => r.urgency === 'critical').length;
    const volunteers = state.helpRequests.reduce((acc, r) => acc + r.volunteers.length, 0);
    
    return { total, open, critical, volunteers };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg text-white p-8">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Community Help Hub
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-6">
            Connecting people in need with local volunteers and NGOs. 
            Together, we can make a difference in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/create-request" className="btn-secondary bg-white text-primary-700 hover:bg-gray-50">
              <Plus className="h-4 w-4 mr-2" />
              Request Help
            </Link>
            <button 
              onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
              className="btn-secondary bg-primary-500 text-white hover:bg-primary-400 border-primary-400"
            >
              <MapPin className="h-4 w-4 mr-2" />
              {viewMode === 'list' ? 'View Map' : 'View List'}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Heart className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Requests</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.open}</p>
              <p className="text-sm text-gray-600">Open Requests</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.critical}</p>
              <p className="text-sm text-gray-600">Critical</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.volunteers}</p>
              <p className="text-sm text-gray-600">Active Volunteers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search help requests by title, description, category, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filters */}
      <FilterSystem />

      {/* Content Area */}
      {viewMode === 'list' ? (
        <HelpRequestList searchTerm={searchTerm} />
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Help Requests Map</h2>
            <button
              onClick={() => setViewMode('list')}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Switch to List View
            </button>
          </div>
          <InteractiveMap
            helpRequests={state.helpRequests}
            onMarkerClick={handleMarkerClick}
            height="600px"
          />
        </div>
      )}

      {/* Call to Action */}
      {!state.user.isAuthenticated && (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Join Our Community
          </h3>
          <p className="text-gray-600 mb-6">
            Sign up to create help requests, volunteer for causes you care about, and make a real impact in your community.
          </p>
          <Link to="/login" className="btn-primary">
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
