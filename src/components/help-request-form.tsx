'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { AlertTriangle, MapPin, Clock, Send } from 'lucide-react'

interface HelpRequestFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function HelpRequestForm({ onSuccess, onCancel }: HelpRequestFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: '',
    address: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onSuccess()
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'CRITICAL': return 'bg-red-500'
      case 'HIGH': return 'bg-orange-500'
      case 'MEDIUM': return 'bg-yellow-500'
      case 'LOW': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Request Title *
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Brief description of what you need help with"
            required
            className="mt-1"
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category" className="text-sm font-medium">
            Category *
          </Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FOOD">Food & Meals</SelectItem>
              <SelectItem value="SHELTER">Shelter & Housing</SelectItem>
              <SelectItem value="MEDICAL">Medical Assistance</SelectItem>
              <SelectItem value="TRANSPORTATION">Transportation</SelectItem>
              <SelectItem value="CLOTHING">Clothing & Supplies</SelectItem>
              <SelectItem value="FINANCIAL">Financial Help</SelectItem>
              <SelectItem value="EMOTIONAL_SUPPORT">Emotional Support</SelectItem>
              <SelectItem value="ELDER_CARE">Elder Care</SelectItem>
              <SelectItem value="CHILD_CARE">Child Care</SelectItem>
              <SelectItem value="DISASTER_RELIEF">Disaster Relief</SelectItem>
              <SelectItem value="EDUCATION">Education</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Urgency */}
        <div>
          <Label htmlFor="urgency" className="text-sm font-medium">
            Urgency Level *
          </Label>
          <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  Low - Can wait
                </div>
              </SelectItem>
              <SelectItem value="MEDIUM">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  Medium - Soon
                </div>
              </SelectItem>
              <SelectItem value="HIGH">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  High - Urgent
                </div>
              </SelectItem>
              <SelectItem value="CRITICAL">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  Critical - Emergency
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Detailed Description *
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Please provide more details about your situation and what kind of help you need..."
            required
            className="mt-1 min-h-[100px]"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <Label htmlFor="address" className="text-sm font-medium">
            Location *
          </Label>
          <div className="relative mt-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your address or location"
              required
              className="pl-10"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <Label htmlFor="contactName" className="text-sm font-medium">
            Contact Name *
          </Label>
          <Input
            id="contactName"
            value={formData.contactName}
            onChange={(e) => handleInputChange('contactName', e.target.value)}
            placeholder="Your full name"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="contactPhone" className="text-sm font-medium">
            Phone Number *
          </Label>
          <Input
            id="contactPhone"
            value={formData.contactPhone}
            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
            placeholder="Your phone number"
            required
            className="mt-1"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="contactEmail" className="text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
            placeholder="Your email address (optional)"
            className="mt-1"
          />
        </div>
      </div>

      {/* Preview Card */}
      {formData.title && formData.category && formData.urgency && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Preview Your Request
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{formData.title}</h4>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getUrgencyColor(formData.urgency)}`}></div>
                  <span className="text-sm text-gray-600">{formData.urgency}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{formData.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {formData.address}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Just now
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white"
        >
          {isSubmitting ? (
            <>
              <Clock className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Request
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}