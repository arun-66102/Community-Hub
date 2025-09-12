import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Users, Home, Stethoscope, ShoppingBag } from 'lucide-react';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different urgency levels
const createCustomIcon = (urgency, category) => {
  const colors = {
    critical: '#dc2626',
    high: '#ea580c',
    medium: '#d97706',
    low: '#16a34a'
  };

  const color = colors[urgency] || colors.medium;
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="color: white; font-size: 12px; font-weight: bold;">
          ${urgency === 'critical' ? '!' : urgency === 'high' ? 'H' : urgency === 'medium' ? 'M' : 'L'}
        </div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

// Component to handle map events
function MapEventHandler({ onLocationSelect, selectedLocation }) {
  const map = useMapEvents({
    click(e) {
      if (onLocationSelect) {
        onLocationSelect({
          lat: e.latlng.lat,
          lng: e.latlng.lng
        });
      }
    }
  });

  // Add selected location marker
  useEffect(() => {
    if (selectedLocation && map) {
      const marker = L.marker([selectedLocation.lat, selectedLocation.lng], {
        icon: L.divIcon({
          html: `
            <div style="
              background-color: #3b82f6;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            "></div>
          `,
          className: 'selected-location-marker',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
      }).addTo(map);

      return () => {
        map.removeLayer(marker);
      };
    }
  }, [selectedLocation, map]);

  return null;
}

// Component to handle geolocation
function LocationButton({ onLocationFound }) {
  const map = useMap();
  const [isLocating, setIsLocating] = useState(false);

  const handleGetLocation = () => {
    setIsLocating(true);
    map.locate({
      setView: true,
      maxZoom: 16,
      timeout: 10000,
      enableHighAccuracy: true
    });
  };

  useEffect(() => {
    const handleLocationFound = (e) => {
      setIsLocating(false);
      if (onLocationFound) {
        onLocationFound({
          lat: e.latlng.lat,
          lng: e.latlng.lng
        });
      }
    };

    const handleLocationError = () => {
      setIsLocating(false);
      alert('Unable to find your location. Please click on the map to select a location.');
    };

    map.on('locationfound', handleLocationFound);
    map.on('locationerror', handleLocationError);

    return () => {
      map.off('locationfound', handleLocationFound);
      map.off('locationerror', handleLocationError);
    };
  }, [map, onLocationFound]);

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <button
        onClick={handleGetLocation}
        disabled={isLocating}
        className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-2 shadow-md transition-colors disabled:opacity-50"
        title="Get my location"
      >
        <Navigation className={`h-5 w-5 text-gray-600 ${isLocating ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
}

// Category icons
const getCategoryIcon = (category) => {
  switch (category) {
    case 'housing':
      return <Home className="h-4 w-4" />;
    case 'medical':
      return <Stethoscope className="h-4 w-4" />;
    case 'food':
      return <ShoppingBag className="h-4 w-4" />;
    default:
      return <Users className="h-4 w-4" />;
  }
};

function InteractiveMap({ 
  helpRequests = [], 
  onLocationSelect, 
  selectedLocation, 
  center = [40.7128, -74.0060], 
  zoom = 12,
  height = '400px',
  showLocationButton = false,
  onLocationFound,
  onMarkerClick
}) {
  const mapRef = useRef();

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-gray-200" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Map event handler for location selection */}
        <MapEventHandler 
          onLocationSelect={onLocationSelect}
          selectedLocation={selectedLocation}
        />
        
        {/* Location button */}
        {showLocationButton && (
          <LocationButton onLocationFound={onLocationFound} />
        )}
        
        {/* Help request markers */}
        {helpRequests.map((request) => (
          <Marker
            key={request.id}
            position={[request.location.lat, request.location.lng]}
            icon={createCustomIcon(request.urgency, request.category)}
            eventHandlers={{
              click: () => onMarkerClick && onMarkerClick(request)
            }}
          >
            <Popup className="custom-popup" maxWidth={300}>
              <div className="p-2">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight pr-2">
                    {request.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request.urgency)}`}>
                    {request.urgency}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {request.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <div className="flex items-center space-x-1">
                    {getCategoryIcon(request.category)}
                    <span className="capitalize">{request.category}</span>
                  </div>
                  <span>{formatTimeAgo(request.createdAt)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span>{request.location.address}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Users className="h-3 w-3" />
                    <span>{request.volunteers.length} volunteers</span>
                  </div>
                </div>
                
                {onMarkerClick && (
                  <button
                    onClick={() => onMarkerClick(request)}
                    className="w-full mt-3 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium py-1.5 px-3 rounded transition-colors"
                  >
                    View Details
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md border border-gray-200 p-3 z-[1000]">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">Urgency Levels</h4>
        <div className="space-y-1">
          {[
            { level: 'critical', label: 'Critical', color: '#dc2626' },
            { level: 'high', label: 'High', color: '#ea580c' },
            { level: 'medium', label: 'Medium', color: '#d97706' },
            { level: 'low', label: 'Low', color: '#16a34a' }
          ].map(({ level, label, color }) => (
            <div key={level} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InteractiveMap;
