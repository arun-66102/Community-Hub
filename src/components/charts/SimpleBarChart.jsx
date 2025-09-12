import React from 'react';

const SimpleBarChart = ({ data, title, colors = {}, horizontal = false }) => {
  const maxValue = Math.max(...Object.values(data));
  const entries = Object.entries(data);

  if (maxValue === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64 flex items-end justify-between space-x-2 p-4">
        {entries.map(([key, value]) => {
          const height = (value / maxValue) * 200;
          const color = colors[key] || '#3b82f6';
          
          return (
            <div key={key} className="flex flex-col items-center flex-1">
              <div className="relative group">
                <div
                  className="w-full rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer"
                  style={{
                    height: `${height}px`,
                    backgroundColor: color,
                    minHeight: '4px'
                  }}
                />
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {value}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600 text-center capitalize truncate w-full">
                {key}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleBarChart;
