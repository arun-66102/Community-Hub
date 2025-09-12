'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapPin, Users, Heart, Clock, AlertTriangle, CheckCircle, Search, Settings } from 'lucide-react'
import { HelpRequestForm } from '@/components/help-request-form'
import { HelpRequestsList } from '@/components/help-requests-list'
import { InteractiveMap } from '@/components/interactive-map'
import { SimpleMap } from '@/components/simple-map'
import { UrgencyFilter } from '@/components/urgency-filter'
import { AccessibilityFeatures } from '@/components/accessibility-features'

export default function CommunityHelpHub() {
  const [activeTab, setActiveTab] = useState('requests')
  const [selectedUrgency, setSelectedUrgency] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [showAccessibility, setShowAccessibility] = useState(false)
  const [useSimpleMap, setUseSimpleMap] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content for screen readers */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" aria-hidden="true" />
              <h1 className="text-2xl font-bold text-foreground">Community Help Hub</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
              <a href="#requests" className="text-sm font-medium hover:text-primary transition-colors">
                Help Requests
              </a>
              <a href="#map" className="text-sm font-medium hover:text-primary transition-colors">
                Map View
              </a>
              <a href="#ngos" className="text-sm font-medium hover:text-primary transition-colors">
                NGOs
              </a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => setShowAccessibility(!showAccessibility)}
                aria-label="Accessibility settings"
                className="sr-only:not-sr-only"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => setShowRequestForm(true)}
                className="bg-red-500 hover:bg-red-600 text-white"
                aria-label="Request help"
              >
                Request Help
              </Button>
              <Button variant="outline">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessibility Panel */}
      {showAccessibility && (
        <div className="border-b bg-background">
          <div className="container mx-auto px-4 py-4">
            <AccessibilityFeatures />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 py-16" aria-labelledby="hero-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="hero-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Connecting Communities Through Compassion
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our platform to request help, volunteer your time, or connect with local NGOs. 
            Together, we can make a difference in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => setShowRequestForm(true)}
              className="bg-red-500 hover:bg-red-600 text-white"
              aria-label="I need help - request assistance"
            >
              <AlertTriangle className="mr-2 h-5 w-5" aria-hidden="true" />
              I Need Help
            </Button>
            <Button size="lg" variant="outline" aria-label="I want to help - volunteer">
              <Users className="mr-2 h-5 w-5" aria-hidden="true" />
              I Want to Help
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8" role="tablist">
            <TabsTrigger value="requests" role="tab" aria-selected={activeTab === 'requests'}>
              Help Requests
            </TabsTrigger>
            <TabsTrigger value="map" role="tab" aria-selected={activeTab === 'map'}>
              Map View
            </TabsTrigger>
            <TabsTrigger value="statistics" role="tab" aria-selected={activeTab === 'statistics'}>
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4">
                <UrgencyFilter 
                  selectedUrgency={selectedUrgency}
                  onUrgencyChange={setSelectedUrgency}
                />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48" aria-label="Select category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="FOOD">Food</SelectItem>
                    <SelectItem value="SHELTER">Shelter</SelectItem>
                    <SelectItem value="MEDICAL">Medical</SelectItem>
                    <SelectItem value="TRANSPORTATION">Transportation</SelectItem>
                    <SelectItem value="CLOTHING">Clothing</SelectItem>
                    <SelectItem value="FINANCIAL">Financial</SelectItem>
                    <SelectItem value="EMOTIONAL_SUPPORT">Emotional Support</SelectItem>
                    <SelectItem value="ELDER_CARE">Elder Care</SelectItem>
                    <SelectItem value="CHILD_CARE">Child Care</SelectItem>
                    <SelectItem value="DISASTER_RELIEF">Disaster Relief</SelectItem>
                    <SelectItem value="EDUCATION">Education</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" aria-hidden="true" />
                <Input 
                  placeholder="Search requests..." 
                  className="pl-10 w-64"
                  aria-label="Search help requests"
                />
              </div>
            </div>

            {/* Help Requests List */}
            <HelpRequestsList 
              urgencyFilter={selectedUrgency}
              categoryFilter={selectedCategory}
            />
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                      Interactive Help Map
                    </CardTitle>
                    <CardDescription>
                      View help requests in your area and find opportunities to help nearby
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={useSimpleMap ? "outline" : "default"}
                      size="sm"
                      onClick={() => setUseSimpleMap(false)}
                    >
                      Advanced Map
                    </Button>
                    <Button
                      variant={useSimpleMap ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUseSimpleMap(true)}
                    >
                      Simple Map
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full rounded-lg overflow-hidden">
                  {useSimpleMap ? <SimpleMap /> : <InteractiveMap />}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Volunteers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,341</div>
                  <p className="text-xs text-muted-foreground">
                    +23% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Helped Today</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">
                    +5% from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">NGOs</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">
                    +3 new this week
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Help Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 id="modal-title" className="text-2xl font-bold">Request Help</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowRequestForm(false)}
                  aria-label="Close help request form"
                >
                  ×
                </Button>
              </div>
              <HelpRequestForm 
                onSuccess={() => setShowRequestForm(false)}
                onCancel={() => setShowRequestForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}