import React from 'react';
import { useApp } from '../context/AppContext';
import { Filter, X, MapPin, Clock, Tag, CheckCircle } from 'lucide-react';

function FilterSystem({ onFilterChange }) {
  const { state, actions } = useApp();
  const { filters } = state;

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'food', label: 'Food & Supplies' },
    { value: 'housing', label: 'Housing & Shelter' },
    { value: 'medical', label: 'Medical & Healthcare' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'childcare', label: 'Childcare' },
    { value: 'elderly', label: 'Elderly Care' },
    { value: 'education', label: 'Education & Tutoring' },
    { value: 'other', label: 'Other' }
  ];

  const urgencyLevels = [
    { value: 'all', label: 'All Urgency Levels', color: 'text-gray-600' },
    { value: 'critical', label: 'Critical', color: 'text-red-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'low', label: 'Low', color: 'text-green-600' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    actions.setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      category: 'all',
      urgency: 'all',
      status: 'all',
      location: null
    };
    actions.setFilters(defaultFilters);
    if (onFilterChange) {
      onFilterChange(defaultFilters);
    }
  };

  const hasActiveFilters = () => {
    return filters.category !== 'all' || 
           filters.urgency !== 'all' || 
           filters.status !== 'all' || 
           filters.location !== null;
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.urgency !== 'all') count++;
    if (filters.status !== 'all') count++;
    if (filters.location) count++;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          {hasActiveFilters() && (
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        {hasActiveFilters() && (
          <button
            onClick={clearAllFilters}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Tag className="inline h-4 w-4 mr-1" />
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Urgency Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="inline h-4 w-4 mr-1" />
            Urgency
          </label>
          <select
            value={filters.urgency}
            onChange={(e) => handleFilterChange('urgency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            {urgencyLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <CheckCircle className="inline h-4 w-4 mr-1" />
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter - Placeholder for future implementation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            Location
          </label>
          <input
            type="text"
            placeholder="Filter by location (coming soon)"
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-400 text-sm cursor-not-allowed"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.category !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Category: {categories.find(c => c.value === filters.category)?.label}
                <button
                  onClick={() => handleFilterChange('category', 'all')}
                  className="ml-2 hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.urgency !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Urgency: {urgencyLevels.find(u => u.value === filters.urgency)?.label}
                <button
                  onClick={() => handleFilterChange('urgency', 'all')}
                  className="ml-2 hover:text-orange-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.status !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Status: {statusOptions.find(s => s.value === filters.status)?.label}
                <button
                  onClick={() => handleFilterChange('status', 'all')}
                  className="ml-2 hover:text-green-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterSystem;
