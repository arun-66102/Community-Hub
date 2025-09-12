'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Heart, 
  Building2, 
  Shield, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone,
  Mail,
  Calendar
} from 'lucide-react'

type UserRole = 'PERSON_IN_NEED' | 'VOLUNTEER' | 'NGO'

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  phone?: string
  address?: string
  verified?: boolean
  joinDate: string
}

interface RoleManagerProps {
  currentUser?: User
  onRoleChange?: (role: UserRole) => void
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'PERSON_IN_NEED',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Downtown',
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@example.com',
    role: 'VOLUNTEER',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, Midtown',
    joinDate: '2024-01-10'
  },
  {
    id: '3',
    name: 'Community Kitchen',
    email: 'info@communitykitchen.org',
    role: 'NGO',
    phone: '+1 (555) 345-6789',
    address: '321 Charity Blvd, Downtown',
    verified: true,
    joinDate: '2023-12-01'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'VOLUNTEER',
    phone: '+1 (555) 456-7890',
    address: '789 Pine Rd, Suburbia',
    joinDate: '2024-01-20'
  }
]

export function UserRoleManager({ currentUser, onRoleChange }: RoleManagerProps) {
  const [users] = useState<User[]>(mockUsers)
  const [selectedRole, setSelectedRole] = useState<UserRole>('VOLUNTEER')

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'PERSON_IN_NEED': return <Heart className="h-5 w-5" />
      case 'VOLUNTEER': return <Users className="h-5 w-5" />
      case 'NGO': return <Building2 className="h-5 w-5" />
    }
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'PERSON_IN_NEED': return 'bg-red-100 text-red-800 border-red-200'
      case 'VOLUNTEER': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'NGO': return 'bg-green-100 text-green-800 border-green-200'
    }
  }

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'PERSON_IN_NEED': return 'Person in Need'
      case 'VOLUNTEER': return 'Volunteer'
      case 'NGO': return 'NGO Organization'
    }
  }

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'PERSON_IN_NEED':
        return 'Request help from volunteers and NGOs in your community'
      case 'VOLUNTEER':
        return 'Offer your time and skills to help those in need'
      case 'NGO':
        return 'Manage your organization and coordinate relief efforts'
    }
  }

  const filteredUsers = users.filter(user => user.role === selectedRole)

  return (
    <div className="space-y-6">
      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            User Roles & Permissions
          </CardTitle>
          <CardDescription>
            Different roles have different capabilities and access levels in the Community Help Hub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="PERSON_IN_NEED" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Person in Need
              </TabsTrigger>
              <TabsTrigger value="VOLUNTEER" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Volunteer
              </TabsTrigger>
              <TabsTrigger value="NGO" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                NGO
              </TabsTrigger>
            </TabsList>

            <TabsContent value="PERSON_IN_NEED" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Role Capabilities</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Create help requests
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      View nearby volunteers and NGOs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Communicate with volunteers
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Track request status
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Valid contact information
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Location access for mapping
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Accurate need description
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="VOLUNTEER" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Role Capabilities</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Browse and respond to help requests
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      View requests on interactive map
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Communicate with requesters
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Track volunteer history
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Earn recognition badges
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Complete profile information
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Skills and availability
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Background check (optional)
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="NGO" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Role Capabilities</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Create organization profile
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Post bulk help requests
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Manage volunteers
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Coordinate relief efforts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Access analytics dashboard
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Organization verification
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Official documentation
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Dedicated coordinator
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Users by Role */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getRoleIcon(selectedRole)}
            {getRoleLabel(selectedRole)}s
          </CardTitle>
          <CardDescription>
            {getRoleDescription(selectedRole)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {user.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {user.address}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {new Date(user.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user.verified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge className={getRoleColor(user.role)}>
                    {getRoleLabel(user.role)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}