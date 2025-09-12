import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import HelpRequestCard from './HelpRequestCard';
import { Search, AlertCircle } from 'lucide-react';

function HelpRequestList({ searchTerm = '', onVolunteer }) {
  const { state, actions } = useApp();
  const { helpRequests, filters } = state;

  const filteredRequests = useMemo(() => {
    let filtered = [...helpRequests];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(request =>
        request.title.toLowerCase().includes(searchLower) ||
        request.description.toLowerCase().includes(searchLower) ||
        request.category.toLowerCase().includes(searchLower) ||
        request.location.address.toLowerCase().includes(searchLower) ||
        request.requester.name.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(request => request.category === filters.category);
    }

    // Apply urgency filter
    if (filters.urgency !== 'all') {
      filtered = filtered.filter(request => request.urgency === filters.urgency);
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(request => request.status === filters.status);
    }

    // Sort by urgency (critical first) and then by creation date (newest first)
    const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    filtered.sort((a, b) => {
      const urgencyDiff = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
      if (urgencyDiff !== 0) return urgencyDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return filtered;
  }, [helpRequests, filters, searchTerm]);

  const handleVolunteer = (requestId) => {
    if (!state.user.isAuthenticated) {
      actions.addNotification({
        type: 'warning',
        message: 'Please log in to volunteer for help requests.'
      });
      return;
    }

    const volunteer = {
      id: state.user.id,
      name: state.user.name,
      role: state.user.role,
      contactInfo: state.user.email
    };

    actions.volunteerForRequest(requestId, volunteer);
    
    if (onVolunteer) {
      onVolunteer(requestId);
    }
  };

  const getResultsText = () => {
    const total = helpRequests.length;
    const filtered = filteredRequests.length;
    
    if (searchTerm.trim()) {
      return `${filtered} result${filtered !== 1 ? 's' : ''} found for "${searchTerm}"`;
    }
    
    if (filtered === total) {
      return `Showing all ${total} help request${total !== 1 ? 's' : ''}`;
    }
    
    return `Showing ${filtered} of ${total} help request${total !== 1 ? 's' : ''}`;
  };

  if (helpRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Help Requests Yet</h3>
        <p className="text-gray-500 mb-6">
          Be the first to create a help request and connect with your community.
        </p>
        <button
          onClick={() => window.location.href = '/create-request'}
          className="btn-primary"
        >
          Create First Request
        </button>
      </div>
    );
  }

  if (filteredRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
        <p className="text-gray-500 mb-6">
          {searchTerm.trim() 
            ? `No help requests match your search for "${searchTerm}"`
            : 'No help requests match your current filters'
          }
        </p>
        <button
          onClick={() => {
            actions.setFilters({
              category: 'all',
              urgency: 'all',
              status: 'all',
              location: null
            });
          }}
          className="btn-secondary"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Results header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-600">{getResultsText()}</p>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>Sorted by urgency and date</span>
        </div>
      </div>

      {/* Request cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map(request => (
          <HelpRequestCard
            key={request.id}
            request={request}
            onVolunteer={handleVolunteer}
            showVolunteerButton={state.user.isAuthenticated}
          />
        ))}
      </div>

      {/* Load more placeholder for future pagination */}
      {filteredRequests.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Showing {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}

export default HelpRequestList;
