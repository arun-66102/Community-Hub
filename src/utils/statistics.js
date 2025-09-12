// Native JavaScript date utility functions to replace date-fns
const format = (date, formatStr) => {
  const d = new Date(date);
  if (formatStr === 'MMM dd') {
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  }
  return d.toLocaleDateString();
};

const subDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

const startOfDay = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const endOfDay = (date) => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

const isWithinInterval = (date, interval) => {
  const d = new Date(date);
  return d >= interval.start && d <= interval.end;
};

// Calculate comprehensive statistics from help requests
export const calculateStatistics = (helpRequests) => {
  const now = new Date();
  const last7Days = subDays(now, 7);
  const last30Days = subDays(now, 30);

  // Basic counts
  const totalRequests = helpRequests.length;
  const openRequests = helpRequests.filter(r => r.status === 'open').length;
  const inProgressRequests = helpRequests.filter(r => r.status === 'in_progress').length;
  const completedRequests = helpRequests.filter(r => r.status === 'completed').length;
  const totalVolunteers = helpRequests.reduce((acc, r) => acc + r.volunteers.length, 0);

  // Urgency breakdown
  const urgencyStats = {
    critical: helpRequests.filter(r => r.urgency === 'critical').length,
    high: helpRequests.filter(r => r.urgency === 'high').length,
    medium: helpRequests.filter(r => r.urgency === 'medium').length,
    low: helpRequests.filter(r => r.urgency === 'low').length,
  };

  // Category breakdown
  const categoryStats = helpRequests.reduce((acc, request) => {
    acc[request.category] = (acc[request.category] || 0) + 1;
    return acc;
  }, {});

  // Status breakdown
  const statusStats = {
    open: openRequests,
    in_progress: inProgressRequests,
    completed: completedRequests,
  };

  // Time-based statistics
  const requestsLast7Days = helpRequests.filter(r => 
    new Date(r.createdAt) >= last7Days
  ).length;

  const requestsLast30Days = helpRequests.filter(r => 
    new Date(r.createdAt) >= last30Days
  ).length;

  // Daily requests for the last 7 days
  const dailyRequests = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(now, i);
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);
    
    const count = helpRequests.filter(r => {
      const requestDate = new Date(r.createdAt);
      return isWithinInterval(requestDate, { start: dayStart, end: dayEnd });
    }).length;

    dailyRequests.push({
      date: format(date, 'MMM dd'),
      count,
    });
  }

  // Response rate (requests with volunteers vs total requests)
  const requestsWithVolunteers = helpRequests.filter(r => r.volunteers.length > 0).length;
  const responseRate = totalRequests > 0 ? (requestsWithVolunteers / totalRequests) * 100 : 0;

  // Average volunteers per request
  const avgVolunteersPerRequest = totalRequests > 0 ? totalVolunteers / totalRequests : 0;

  // Completion rate
  const completionRate = totalRequests > 0 ? (completedRequests / totalRequests) * 100 : 0;

  return {
    overview: {
      totalRequests,
      openRequests,
      inProgressRequests,
      completedRequests,
      totalVolunteers,
      responseRate: Math.round(responseRate),
      completionRate: Math.round(completionRate),
      avgVolunteersPerRequest: Math.round(avgVolunteersPerRequest * 10) / 10,
    },
    urgencyStats,
    categoryStats,
    statusStats,
    timeStats: {
      requestsLast7Days,
      requestsLast30Days,
      dailyRequests,
    },
  };
};

// Get color schemes for charts
export const getChartColors = () => ({
  urgency: {
    critical: '#ef4444', // red-500
    high: '#f97316',     // orange-500
    medium: '#eab308',   // yellow-500
    low: '#22c55e',      // green-500
  },
  category: {
    food: '#3b82f6',        // blue-500
    housing: '#8b5cf6',     // violet-500
    medical: '#ef4444',     // red-500
    transportation: '#06b6d4', // cyan-500
    childcare: '#f59e0b',   // amber-500
    'elderly care': '#84cc16', // lime-500
    education: '#6366f1',   // indigo-500
    other: '#6b7280',       // gray-500
  },
  status: {
    open: '#3b82f6',        // blue-500
    in_progress: '#f59e0b', // amber-500
    completed: '#10b981',   // emerald-500
  },
});

// Format numbers for display
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Calculate trend percentage
export const calculateTrend = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};
