import React from 'react';

const SimpleLineChart = ({ data, title, color = '#3b82f6' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.count));
  const minValue = Math.min(...data.map(item => item.count));
  const range = maxValue - minValue || 1;

  const chartWidth = 400;
  const chartHeight = 200;
  const padding = 40;

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (chartWidth - 2 * padding);
    const y = chartHeight - padding - ((item.count - minValue) / range) * (chartHeight - 2 * padding);
    return { x, y, ...item };
  });

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64 flex items-center justify-center">
        <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => {
            const y = padding + (i / 4) * (chartHeight - 2 * padding);
            return (
              <line
                key={i}
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Area fill */}
          <path
            d={`${pathData} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`}
            fill={color + '20'}
          />
          
          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill={color}
                stroke="#ffffff"
                strokeWidth="2"
                className="hover:r-6 transition-all cursor-pointer"
              />
              {/* Tooltip on hover */}
              <g className="opacity-0 hover:opacity-100 transition-opacity">
                <rect
                  x={point.x - 20}
                  y={point.y - 30}
                  width="40"
                  height="20"
                  fill="#1f2937"
                  rx="4"
                />
                <text
                  x={point.x}
                  y={point.y - 15}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                >
                  {point.count}
                </text>
              </g>
            </g>
          ))}
          
          {/* X-axis labels */}
          {points.map((point, index) => (
            <text
              key={index}
              x={point.x}
              y={chartHeight - 10}
              textAnchor="middle"
              fill="#6b7280"
              fontSize="12"
            >
              {point.date}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default SimpleLineChart;
