# API Documentation

## Context API Structure

### AppContext

The main application state management using React Context API.

#### State Structure
```javascript
{
  user: {
    id: string,
    name: string,
    email: string,
    role: 'volunteer' | 'ngo' | 'needsHelp',
    isAuthenticated: boolean
  },
  helpRequests: [
    {
      id: string,
      title: string,
      description: string,
      category: 'food' | 'housing' | 'medical' | 'transportation' | 'childcare' | 'elderly' | 'education' | 'other',
      urgency: 'critical' | 'high' | 'medium' | 'low',
      location: {
        lat: number,
        lng: number,
        address: string
      },
      requester: {
        name: string,
        role: string
      },
      volunteers: Array,
      status: 'open' | 'in_progress' | 'completed',
      createdAt: string,
      contactInfo: string
    }
  ],
  filters: {
    category: string,
    urgency: string,
    status: string,
    location: object | null
  },
  notifications: Array
}
```

#### Actions
- `loginUser(userData)` - Authenticate user
- `logoutUser()` - Sign out user
- `addHelpRequest(requestData)` - Create new help request
- `updateHelpRequest(requestData)` - Update existing request
- `volunteerForRequest(requestId, volunteer)` - Add volunteer to request
- `setFilters(filters)` - Update filter criteria
- `addNotification(notification)` - Show notification
- `removeNotification(notificationId)` - Dismiss notification

## Component Props

### InteractiveMap
```javascript
{
  helpRequests: Array,
  onLocationSelect: Function,
  selectedLocation: Object,
  center: [lat, lng],
  zoom: number,
  height: string,
  showLocationButton: boolean,
  onLocationFound: Function,
  onMarkerClick: Function
}
```

### HelpRequestCard
```javascript
{
  request: Object,
  onVolunteer: Function,
  showVolunteerButton: boolean
}
```

### FilterSystem
```javascript
{
  onFilterChange: Function
}
```
