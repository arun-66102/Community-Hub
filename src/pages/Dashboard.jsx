import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { calculateStatistics, getChartColors, formatNumber } from '../utils/statistics';
import StatCard from '../components/StatCard';
import SimplePieChart from '../components/charts/SimplePieChart';
import SimpleBarChart from '../components/charts/SimpleBarChart';
import SimpleLineChart from '../components/charts/SimpleLineChart';
import {
  Heart,
  Clock,
  CheckCircle,
  Users,
  AlertTriangle,
  TrendingUp,
  Activity,
  Target,
} from 'lucide-react';

function Dashboard() {
  const { state } = useApp();
  const statistics = useMemo(() => calculateStatistics(state.helpRequests), [state.helpRequests]);
  const colors = getChartColors();

  const {
    overview,
    urgencyStats,
    categoryStats,
    statusStats,
    timeStats,
  } = statistics;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white p-8">
        <h1 className="text-3xl font-bold mb-2">Community Impact Dashboard</h1>
        <p className="text-blue-100">
          Track community engagement, volunteer activity, and help request trends
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Requests"
          value={formatNumber(overview.totalRequests)}
          icon={Heart}
          color="blue"
          subtitle="All time"
        />
        <StatCard
          title="Active Volunteers"
          value={formatNumber(overview.totalVolunteers)}
          icon={Users}
          color="green"
          subtitle="Currently helping"
        />
        <StatCard
          title="Response Rate"
          value={`${overview.responseRate}%`}
          icon={Target}
          color="purple"
          subtitle="Requests with volunteers"
        />
        <StatCard
          title="Completion Rate"
          value={`${overview.completionRate}%`}
          icon={CheckCircle}
          color="green"
          subtitle="Successfully resolved"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Open Requests"
          value={formatNumber(overview.openRequests)}
          icon={Clock}
          color="orange"
          subtitle="Awaiting help"
        />
        <StatCard
          title="In Progress"
          value={formatNumber(overview.inProgressRequests)}
          icon={Activity}
          color="yellow"
          subtitle="Being addressed"
        />
        <StatCard
          title="Critical Requests"
          value={formatNumber(urgencyStats.critical)}
          icon={AlertTriangle}
          color="red"
          subtitle="Urgent attention needed"
        />
        <StatCard
          title="Avg Volunteers/Request"
          value={overview.avgVolunteersPerRequest}
          icon={TrendingUp}
          color="blue"
          subtitle="Community engagement"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Status Distribution */}
        <SimplePieChart
          data={statusStats}
          title="Request Status Distribution"
          colors={colors.status}
        />

        {/* Urgency Level Breakdown */}
        <SimplePieChart
          data={urgencyStats}
          title="Urgency Level Breakdown"
          colors={colors.urgency}
        />
      </div>

      {/* Category Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleBarChart
          data={categoryStats}
          title="Requests by Category"
          colors={colors.category}
        />

        {/* Daily Request Trend */}
        <SimpleLineChart
          data={timeStats.dailyRequests}
          title="Daily Requests (Last 7 Days)"
          color="#3b82f6"
        />
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {timeStats.requestsLast7Days}
            </div>
            <div className="text-sm text-gray-600">Requests This Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {timeStats.requestsLast30Days}
            </div>
            <div className="text-sm text-gray-600">Requests This Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {Object.keys(categoryStats).length}
            </div>
            <div className="text-sm text-gray-600">Active Categories</div>
          </div>
        </div>
      </div>

      {/* Insights Panel */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Most Requested Category</h4>
            <p className="text-sm text-gray-600">
              {Object.entries(categoryStats).length > 0 
                ? Object.entries(categoryStats).reduce((a, b) => a[1] > b[1] ? a : b)[0]
                : 'No data available'
              } is the most common type of help request
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Community Engagement</h4>
            <p className="text-sm text-gray-600">
              {overview.responseRate}% of requests receive volunteer support, showing strong community involvement
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Urgency Distribution</h4>
            <p className="text-sm text-gray-600">
              {urgencyStats.critical} critical requests need immediate attention
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Success Rate</h4>
            <p className="text-sm text-gray-600">
              {overview.completionRate}% completion rate demonstrates effective community support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
