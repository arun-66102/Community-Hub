'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Type, 
  Minus, 
  Plus, 
  Moon,
  Sun,
  Keyboard,
  ZoomIn,
  ZoomOut,
  Contrast
} from 'lucide-react'

interface AccessibilityFeaturesProps {
  className?: string
}

export function AccessibilityFeatures({ className }: AccessibilityFeaturesProps) {
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [reduceMotion, setReduceMotion] = useState(false)

  const toggleHighContrast = () => {
    setHighContrast(!highContrast)
    document.documentElement.classList.toggle('high-contrast')
  }

  const toggleLargeText = () => {
    setLargeText(!largeText)
    document.documentElement.classList.toggle('large-text')
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const toggleScreenReader = () => {
    setScreenReader(!screenReader)
    // In a real app, this would integrate with screen reader APIs
  }

  const toggleReduceMotion = () => {
    setReduceMotion(!reduceMotion)
    document.documentElement.classList.toggle('reduce-motion')
  }

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 24)
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}px`
  }

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 12)
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}px`
  }

  const resetSettings = () => {
    setHighContrast(false)
    setLargeText(false)
    setDarkMode(false)
    setScreenReader(false)
    setFontSize(16)
    setReduceMotion(false)
    
    document.documentElement.classList.remove('high-contrast', 'large-text', 'dark', 'reduce-motion')
    document.documentElement.style.fontSize = '16px'
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Keyboard className="h-5 w-5" />
          Accessibility Features
        </CardTitle>
        <CardDescription>
          Customize your experience with these accessibility options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual Options */}
        <div>
          <h3 className="font-semibold mb-3">Visual Options</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Button
              variant={highContrast ? "default" : "outline"}
              size="sm"
              onClick={toggleHighContrast}
              className="flex items-center gap-2"
            >
              {highContrast ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              High Contrast
            </Button>
            <Button
              variant={largeText ? "default" : "outline"}
              size="sm"
              onClick={toggleLargeText}
              className="flex items-center gap-2"
            >
              <Type className="h-4 w-4" />
              Large Text
            </Button>
            <Button
              variant={darkMode ? "default" : "outline"}
              size="sm"
              onClick={toggleDarkMode}
              className="flex items-center gap-2"
            >
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              Dark Mode
            </Button>
          </div>
        </div>

        {/* Text Size */}
        <div>
          <h3 className="font-semibold mb-3">Text Size</h3>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={decreaseFontSize}
              disabled={fontSize <= 12}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="flex-1 text-center">
              <Badge variant="outline">{fontSize}px</Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={increaseFontSize}
              disabled={fontSize >= 24}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Motion & Interaction */}
        <div>
          <h3 className="font-semibold mb-3">Motion & Interaction</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              variant={reduceMotion ? "default" : "outline"}
              size="sm"
              onClick={toggleReduceMotion}
              className="flex items-center gap-2"
            >
              <Minus className="h-4 w-4" />
              Reduce Motion
            </Button>
            <Button
              variant={screenReader ? "default" : "outline"}
              size="sm"
              onClick={toggleScreenReader}
              className="flex items-center gap-2"
            >
              {screenReader ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              Screen Reader
            </Button>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div>
          <h3 className="font-semibold mb-3">Keyboard Shortcuts</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Toggle High Contrast</span>
              <Badge variant="outline">Ctrl + H</Badge>
            </div>
            <div className="flex justify-between">
              <span>Increase Text Size</span>
              <Badge variant="outline">Ctrl + +</Badge>
            </div>
            <div className="flex justify-between">
              <span>Decrease Text Size</span>
              <Badge variant="outline">Ctrl + -</Badge>
            </div>
            <div className="flex justify-between">
              <span>Toggle Dark Mode</span>
              <Badge variant="outline">Ctrl + D</Badge>
            </div>
            <div className="flex justify-between">
              <span>Focus Navigation</span>
              <Badge variant="outline">Tab</Badge>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            onClick={resetSettings}
            className="w-full"
          >
            Reset All Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}