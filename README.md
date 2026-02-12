# Community Help Hub

A social impact platform that connects people in need with local volunteers and NGOs. Built with React.js, Tailwind CSS, and Leaflet for interactive mapping.

## Features

### 🌟 Core Functionality
- **Help Request Creation**: Easy-to-use form for creating detailed help requests
- **Interactive Map**: Real-time geolocation mapping with Leaflet integration
- **User Role Management**: Support for volunteers, NGOs, and people in need
- **Urgency-Based Filtering**: Smart filtering system for prioritizing critical requests
- **Real-time Notifications**: Instant feedback and updates

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility Features**: WCAG compliant with keyboard navigation and screen reader support
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Emergency Response Workflow**: Streamlined process for critical situations

### 🗺️ Interactive Mapping
- **Live Geolocation**: Automatic location detection and manual selection
- **Custom Markers**: Color-coded urgency levels and category icons
- **Interactive Popups**: Detailed request information with quick actions
- **Map/List Toggle**: Switch between map and list views seamlessly

## Technology Stack

- **Frontend**: React.js 18+ with functional components and hooks
- **Styling**: Tailwind CSS for responsive design
- **Routing**: React Router DOM for seamless navigation
- **Mapping**: Leaflet and React-Leaflet for interactive maps
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API with useReducer
- **Build Tool**: Vite for fast development and building

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd community-help-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FilterSystem.jsx    # Advanced filtering interface
│   ├── Header.jsx          # Navigation and user menu
│   ├── HelpRequestCard.jsx # Individual request display
│   ├── HelpRequestForm.jsx # Request creation form
│   ├── HelpRequestList.jsx # List view with filtering
│   ├── InteractiveMap.jsx  # Leaflet map integration
│   └── NotificationSystem.jsx # Toast notifications
├── context/             # State management
│   └── AppContext.jsx      # Global application state
├── pages/              # Route components
│   ├── CreateRequest.jsx   # Help request creation page
│   ├── Home.jsx           # Main dashboard
│   ├── Login.jsx          # User authentication
│   ├── Profile.jsx        # User profile management
│   └── RequestDetails.jsx # Individual request view
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## User Roles

### 🙋 People in Need
- Create detailed help requests
- Specify urgency levels and categories
- Provide location and contact information
- Track volunteer responses

### 🤝 Volunteers
- Browse and filter help requests
- View requests on interactive map
- Volunteer for multiple requests
- Access contact information when volunteering

### 🏢 NGOs/Organizations
- Coordinate larger relief efforts
- Manage organizational volunteers
- Access enhanced request visibility
- Coordinate with other organizations

## Key Components

### Help Request System
- **Categories**: Food, Housing, Medical, Transportation, Childcare, Elderly Care, Education, Other
- **Urgency Levels**: Critical, High, Medium, Low
- **Status Tracking**: Open, In Progress, Completed
- **Location Services**: GPS integration with manual override

### Interactive Mapping
- **Real-time Updates**: Live request markers with status indicators
- **Custom Icons**: Urgency-based color coding and category symbols
- **Geolocation**: Automatic location detection with privacy controls
- **Responsive Design**: Touch-friendly on mobile devices

### Filtering & Search
- **Multi-criteria Filtering**: Category, urgency, status, and location
- **Text Search**: Full-text search across titles, descriptions, and locations
- **Smart Sorting**: Urgency-first with recency as secondary factor
- **Active Filter Display**: Clear indication of applied filters

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: WCAG AA compliant color schemes
- **Focus Management**: Clear focus indicators and logical tab order
- **Responsive Text**: Scalable fonts and flexible layouts

## Mobile Responsiveness

- **Touch-Friendly**: Large touch targets and gesture support
- **Adaptive Layout**: Responsive grid systems and flexible components
- **Mobile Navigation**: Collapsible menu and optimized user flows
- **Performance**: Optimized images and efficient rendering

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices and patterns
- Implement proper error boundaries
- Use TypeScript for type safety (future enhancement)

### Component Design
- Keep components small and focused
- Use composition over inheritance
- Implement proper prop validation
- Follow accessibility guidelines

### State Management
- Use Context API for global state
- Implement proper error handling
- Use local state for component-specific data
- Follow immutability principles

## Future Enhancements

- [ ] Real-time chat between volunteers and requesters
- [ ] Push notifications for mobile devices
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Integration with external volunteer databases
- [ ] Automated matching algorithms
- [ ] Payment processing for donations
- [ ] Social media integration
- [ ] Offline support with service workers


## Acknowledgments

- Leaflet for excellent mapping capabilities
- Tailwind CSS for beautiful, responsive design
- React community for amazing tools and libraries
- All the volunteers and organizations making a difference

---

**Community Help Hub** - Connecting hearts, building communities, making a difference. 🌟
