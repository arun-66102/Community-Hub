'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  MapPin, 
  Clock, 
  Users, 
  Heart, 
  AlertTriangle, 
  CheckCircle,
  MessageCircle,
  Phone
} from 'lucide-react'

interface HelpRequestsListProps {
  urgencyFilter: string
  categoryFilter: string
}

// Mock data for demonstration
const mockHelpRequests = [
  {
    id: '1',
    title: 'Elderly neighbor needs grocery delivery',
    description: 'My 85-year-old neighbor is unable to leave home and needs help with grocery shopping. She lives alone and has mobility issues.',
    category: 'FOOD',
    urgency: 'HIGH',
    status: 'OPEN',
    address: '123 Main St, Downtown',
    createdAt: '2 hours ago',
    requester: {
      name: 'Sarah Johnson',
      avatar: 'SJ'
    },
    volunteers: 2,
    distance: 0.8
  },
  {
    id: '2',
    title: 'Family needs temporary shelter after house fire',
    description: 'A family of 4 lost their home in a fire last night. They need temporary shelter and basic necessities.',
    category: 'SHELTER',
    urgency: 'CRITICAL',
    status: 'OPEN',
    address: '456 Oak Ave, Midtown',
    createdAt: '4 hours ago',
    requester: {
      name: 'Mike Chen',
      avatar: 'MC'
    },
    volunteers: 5,
    distance: 2.1
  },
  {
    id: '3',
    title: 'Need transportation to medical appointment',
    description: 'I need a ride to my chemotherapy appointment tomorrow at 10 AM. I live in the suburbs and the clinic is downtown.',
    category: 'TRANSPORTATION',
    urgency: 'MEDIUM',
    status: 'OPEN',
    address: '789 Pine Rd, Suburbia',
    createdAt: '6 hours ago',
    requester: {
      name: 'Emily Davis',
      avatar: 'ED'
    },
    volunteers: 1,
    distance: 3.5
  },
  {
    id: '4',
    title: 'Community kitchen needs volunteers for meal prep',
    description: 'Our community kitchen is preparing meals for 200 homeless families this weekend. We need help with food preparation and packaging.',
    category: 'FOOD',
    urgency: 'MEDIUM',
    status: 'OPEN',
    address: '321 Charity Blvd, Downtown',
    createdAt: '1 day ago',
    requester: {
      name: 'Community Kitchen',
      avatar: 'CK'
    },
    volunteers: 8,
    distance: 1.2
  },
  {
    id: '5',
    title: 'Child care assistance needed for single parent',
    description: 'Single parent needs help with child care for 2 children (ages 5 and 8) while attending job interviews this week.',
    category: 'CHILD_CARE',
    urgency: 'HIGH',
    status: 'OPEN',
    address: '555 Family St, Residential Area',
    createdAt: '1 day ago',
    requester: {
      name: 'Lisa Rodriguez',
      avatar: 'LR'
    },
    volunteers: 0,
    distance: 4.0
  }
]

export function HelpRequestsList({ urgencyFilter, categoryFilter }: HelpRequestsListProps) {
  const [requests] = useState(mockHelpRequests)

  const filteredRequests = requests.filter(request => {
    const urgencyMatch = urgencyFilter === 'all' || request.urgency === urgencyFilter
    const categoryMatch = categoryFilter === 'all' || request.category === categoryFilter
    return urgencyMatch && categoryMatch
  })

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

  const handleVolunteer = (requestId: string) => {
    console.log('Volunteering for request:', requestId)
    // In a real app, this would call an API to volunteer
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Help Requests ({filteredRequests.length})
        </h3>
        <div className="text-sm text-gray-600">
          Sorted by: Most Urgent
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No help requests found
            </h3>
            <p className="text-gray-500 text-center">
              Try adjusting your filters or check back later for new requests.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      {request.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getUrgencyColor(request.urgency)}>
                        {request.urgency}
                      </Badge>
                      <Badge variant="outline">
                        {getCategoryLabel(request.category)}
                      </Badge>
                      <Badge variant="secondary">
                        <MapPin className="h-3 w-3 mr-1" />
                        {request.distance} miles away
                      </Badge>
                    </div>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{request.requester.avatar}</AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base">
                  {request.description}
                </CardDescription>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {request.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {request.volunteers} volunteer{request.volunteers !== 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {request.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Requested by {request.requester.name}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Message
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                      onClick={() => handleVolunteer(request.id)}
                    >
                      <Heart className="h-4 w-4" />
                      I Can Help
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}