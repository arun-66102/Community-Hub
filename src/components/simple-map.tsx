'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users, Heart, AlertTriangle } from 'lucide-react'

// Mock help request data
const helpRequests = [
  {
    id: '1',
    title: 'Elderly neighbor needs grocery delivery',
    category: 'FOOD',
    urgency: 'HIGH',
    address: '123 Main St, Downtown',
    distance: 0.8,
    volunteers: 2
  },
  {
    id: '2',
    title: 'Family needs temporary shelter after house fire',
    category: 'SHELTER',
    urgency: 'CRITICAL',
    address: '456 Oak Ave, Midtown',
    distance: 2.1,
    volunteers: 5
  },
  {
    id: '3',
    title: 'Need transportation to medical appointment',
    category: 'TRANSPORTATION',
    urgency: 'MEDIUM',
    address: '789 Pine Rd, Suburbia',
    distance: 3.5,
    volunteers: 1
  },
  {
    id: '4',
    title: 'Community kitchen needs volunteers',
    category: 'FOOD',
    urgency: 'MEDIUM',
    address: '321 Charity Blvd, Downtown',
    distance: 1.2,
    volunteers: 8
  },
  {
    id: '5',
    title: 'Child care assistance needed',
    category: 'CHILD_CARE',
    urgency: 'HIGH',
    address: '555 Family St, Residential Area',
    distance: 4.0,
    volunteers: 0
  }
]

export function SimpleMap() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'CRITICAL': return 'bg-red-500 text-white'
      case 'HIGH': return 'bg-orange-500 text-white'
      case 'MEDIUM': return 'bg-yellow-500 text-white'
      case 'LOW': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'FOOD': return 'Food & Meals'
      case 'SHELTER': return 'Shelter'
      case 'MEDICAL': return 'Medical'
      case 'TRANSPORTATION': return 'Transportation'
      case 'CLOTHING': return 'Clothing'
      case 'FINANCIAL': return 'Financial'
      case 'EMOTIONAL_SUPPORT': return 'Emotional Support'
      case 'ELDER_CARE': return 'Elder Care'
      case 'CHILD_CARE': return 'Child Care'
      case 'DISASTER_RELIEF': return 'Disaster Relief'
      case 'EDUCATION': return 'Education'
      case 'OTHER': return 'Other'
      default: return category
    }
  }

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Interactive Help Map</h3>
                <div className="text-sm text-gray-600">
                  Simplified View - Click on requests for details
                </div>
              </div>
              
              {/* Simplified Map Visualization */}
              <div className="flex-1 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300 relative overflow-hidden">
                {/* Background grid pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="border border-gray-300"></div>
                    ))}
                  </div>
                </div>

                {/* Map markers */}
                {helpRequests.map((request, index) => {
                  const positions = [
                    { top: '20%', left: '30%' },
                    { top: '40%', left: '60%' },
                    { top: '70%', left: '20%' },
                    { top: '35%', left: '45%' },
                    { top: '60%', left: '75%' }
                  ]
                  const pos = positions[index % positions.length]
                  
                  return (
                    <div
                      key={request.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                        selectedRequest === request.id ? 'z-10 scale-125' : 'z-0'
                      }`}
                      style={pos}
                      onClick={() => setSelectedRequest(request.id)}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                          request.urgency === 'CRITICAL' ? 'bg-red-500' :
                          request.urgency === 'HIGH' ? 'bg-orange-500' :
                          request.urgency === 'MEDIUM' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                      >
                        <Heart className="h-3 w-3 text-white" />
                      </div>
                      {selectedRequest === request.id && (
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-[200px] z-20">
                          <div className="text-xs font-medium">{request.title}</div>
                          <div className="text-xs text-gray-600 mt-1">{request.address}</div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Legend */}
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
                  <h4 className="font-semibold text-sm mb-2">Urgency Levels</h4>
                  <div className="space-y-1">
                    {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((urgency) => (
                      <div key={urgency} className="flex items-center gap-2 text-xs">
                        <div 
                          className={`w-3 h-3 rounded-full ${
                            urgency === 'CRITICAL' ? 'bg-red-500' :
                            urgency === 'HIGH' ? 'bg-orange-500' :
                            urgency === 'MEDIUM' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                        ></div>
                        <span>{urgency}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Center indicator */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="text-xs text-blue-600 font-medium mt-1 text-center">Your Location</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardContent className="p-4 h-full overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Nearby Requests</h3>
              <div className="space-y-3">
                {helpRequests.map((request) => (
                  <div
                    key={request.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedRequest === request.id 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedRequest(request.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{request.title}</h4>
                      <Badge className={getUrgencyColor(request.urgency)}>
                        {request.urgency}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {request.address}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {request.volunteers} volunteer{request.volunteers !== 1 ? 's' : ''}
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {request.distance} miles away
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log('Volunteer for request:', request.id)
                      }}
                    >
                      I Can Help
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}