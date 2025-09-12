'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the map component to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

// Mock help request data for map markers
const helpRequests = [
  {
    id: '1',
    title: 'Elderly neighbor needs grocery delivery',
    category: 'FOOD',
    urgency: 'HIGH',
    position: [40.7128, -74.0060], // New York coordinates
    address: '123 Main St, Downtown',
    volunteers: 2
  },
  {
    id: '2',
    title: 'Family needs temporary shelter after house fire',
    category: 'SHELTER',
    urgency: 'CRITICAL',
    position: [40.7589, -73.9851], // Times Square coordinates
    address: '456 Oak Ave, Midtown',
    volunteers: 5
  },
  {
    id: '3',
    title: 'Need transportation to medical appointment',
    category: 'TRANSPORTATION',
    urgency: 'MEDIUM',
    position: [40.6892, -74.0445], // Statue of Liberty coordinates
    address: '789 Pine Rd, Suburbia',
    volunteers: 1
  },
  {
    id: '4',
    title: 'Community kitchen needs volunteers',
    category: 'FOOD',
    urgency: 'MEDIUM',
    position: [40.7505, -73.9934], // Empire State Building coordinates
    address: '321 Charity Blvd, Downtown',
    volunteers: 8
  },
  {
    id: '5',
    title: 'Child care assistance needed',
    category: 'CHILD_CARE',
    urgency: 'HIGH',
    position: [40.7282, -73.7949], // Queens coordinates
    address: '555 Family St, Residential Area',
    volunteers: 0
  }
]

export function InteractiveMap() {
  const [isMounted, setIsMounted] = useState(false)
  const [leaflet, setLeaflet] = useState<any>(null)

  useEffect(() => {
    setIsMounted(true)
    // Dynamically import Leaflet only on client side
    import('leaflet').then(L => {
      setLeaflet(L)
    })
  }, [])

  if (!isMounted || !leaflet) {
    return (
      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'CRITICAL': return '#ef4444' // red-500
      case 'HIGH': return '#f97316' // orange-500
      case 'MEDIUM': return '#eab308' // yellow-500
      case 'LOW': return '#22c55e' // green-500
      default: return '#6b7280' // gray-500
    }
  }

  const createCustomIcon = (urgency: string) => {
    const color = getUrgencyColor(urgency)
    return leaflet.divIcon({
      html: `<div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>`,
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    })
  }

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[40.7128, -74.0060]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {helpRequests.map((request) => (
          <Marker
            key={request.id}
            position={request.position as [number, number]}
            icon={createCustomIcon(request.urgency)}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-sm mb-2">{request.title}</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span 
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: getUrgencyColor(request.urgency) }}
                    ></span>
                    <span className="font-medium">{request.urgency}</span>
                  </div>
                  <p className="text-gray-600">{request.category}</p>
                  <p className="text-gray-600">{request.address}</p>
                  <div className="flex items-center gap-1 text-gray-500">
                    <span>👥</span>
                    <span>{request.volunteers} volunteer{request.volunteers !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                <button 
                  className="mt-3 w-full bg-red-500 text-white text-xs py-1 px-2 rounded hover:bg-red-600 transition-colors"
                  onClick={() => console.log('Volunteer for request:', request.id)}
                >
                  I Can Help
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="font-semibold text-sm mb-2">Urgency Levels</h4>
        <div className="space-y-1">
          {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((urgency) => (
            <div key={urgency} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getUrgencyColor(urgency) }}
              ></div>
              <span>{urgency}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}