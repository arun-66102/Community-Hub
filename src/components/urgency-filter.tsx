'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react'

interface UrgencyFilterProps {
  selectedUrgency: string
  onUrgencyChange: (urgency: string) => void
}

const urgencyLevels = [
  { value: 'all', label: 'All', color: 'bg-gray-500' },
  { value: 'CRITICAL', label: 'Critical', color: 'bg-red-500' },
  { value: 'HIGH', label: 'High', color: 'bg-orange-500' },
  { value: 'MEDIUM', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'LOW', label: 'Low', color: 'bg-green-500' }
]

export function UrgencyFilter({ selectedUrgency, onUrgencyChange }: UrgencyFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Urgency:</span>
      <div className="flex gap-2">
        {urgencyLevels.map((level) => (
          <Button
            key={level.value}
            variant={selectedUrgency === level.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onUrgencyChange(level.value)}
            className={`
              ${selectedUrgency === level.value ? level.color + ' text-white hover:' + level.color + '/90' : ''}
              ${selectedUrgency !== level.value ? 'hover:bg-gray-100' : ''}
              transition-colors
            `}
          >
            {level.value === 'all' ? (
              <CheckCircle className="h-4 w-4 mr-1" />
            ) : (
              <AlertTriangle className="h-4 w-4 mr-1" />
            )}
            {level.label}
          </Button>
        ))}
      </div>
    </div>
  )
}