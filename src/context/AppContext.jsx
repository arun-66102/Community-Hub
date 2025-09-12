import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

// Initial state
const initialState = {
  user: {
    id: null,
    name: '',
    role: 'volunteer', // 'volunteer', 'ngo', 'needsHelp'
    location: null,
    isAuthenticated: false
  },
  helpRequests: [
    {
      id: '1',
      title: 'Need food supplies for elderly neighbors',
      description: 'Looking for volunteers to help deliver groceries to elderly residents in downtown area.',
      category: 'food',
      urgency: 'medium',
      location: { lat: 40.7128, lng: -74.0060, address: 'New York, NY' },
      requester: { name: 'Sarah Johnson', role: 'needsHelp' },
      volunteers: [],
      status: 'open',
      createdAt: new Date().toISOString(),
      contactInfo: 'sarah.j@email.com'
    },
    {
      id: '2',
      title: 'Emergency shelter needed',
      description: 'Family of 4 needs immediate temporary housing due to fire damage.',
      category: 'housing',
      urgency: 'critical',
      location: { lat: 40.7589, lng: -73.9851, address: 'Manhattan, NY' },
      requester: { name: 'Mike Rodriguez', role: 'needsHelp' },
      volunteers: [],
      status: 'open',
      createdAt: new Date().toISOString(),
      contactInfo: 'mike.r@email.com'
    },
    {
      id: '3',
      title: 'Medical transport assistance',
      description: 'Need help getting to medical appointments. Wheelchair accessible vehicle required.',
      category: 'medical',
      urgency: 'high',
      location: { lat: 40.7505, lng: -73.9934, address: 'Times Square, NY' },
      requester: { name: 'Emma Davis', role: 'needsHelp' },
      volunteers: [],
      status: 'open',
      createdAt: new Date().toISOString(),
      contactInfo: 'emma.d@email.com'
    }
  ],
  filters: {
    category: 'all',
    urgency: 'all',
    status: 'all',
    location: null
  },
  notifications: []
};

// Action types
const actionTypes = {
  SET_USER: 'SET_USER',
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  ADD_HELP_REQUEST: 'ADD_HELP_REQUEST',
  UPDATE_HELP_REQUEST: 'UPDATE_HELP_REQUEST',
  VOLUNTEER_FOR_REQUEST: 'VOLUNTEER_FOR_REQUEST',
  SET_FILTERS: 'SET_FILTERS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION'
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        user: { ...action.payload, isAuthenticated: true }
      };
    
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        user: { ...initialState.user }
      };
    
    case actionTypes.ADD_HELP_REQUEST:
      return {
        ...state,
        helpRequests: [...state.helpRequests, action.payload]
      };
    
    case actionTypes.UPDATE_HELP_REQUEST:
      return {
        ...state,
        helpRequests: state.helpRequests.map(request =>
          request.id === action.payload.id
            ? { ...request, ...action.payload }
            : request
        )
      };
    
    case actionTypes.VOLUNTEER_FOR_REQUEST:
      return {
        ...state,
        helpRequests: state.helpRequests.map(request =>
          request.id === action.payload.requestId
            ? {
                ...request,
                volunteers: [...request.volunteers, action.payload.volunteer]
              }
            : request
        )
      };
    
    case actionTypes.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    
    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    
    default:
      return state;
  }
}

// Context Provider Component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const actions = {
    setUser: (userData) => {
      dispatch({ type: actionTypes.SET_USER, payload: userData });
    },

    loginUser: (userData) => {
      dispatch({ type: actionTypes.LOGIN_USER, payload: userData });
      localStorage.setItem('user', JSON.stringify(userData));
    },

    logoutUser: () => {
      dispatch({ type: actionTypes.LOGOUT_USER });
      localStorage.removeItem('user');
    },

    addHelpRequest: (requestData) => {
      const newRequest = {
        ...requestData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        volunteers: [],
        status: 'open'
      };
      dispatch({ type: actionTypes.ADD_HELP_REQUEST, payload: newRequest });
      
      // Add notification
      actions.addNotification({
        id: uuidv4(),
        type: 'success',
        message: 'Help request created successfully!',
        timestamp: new Date().toISOString()
      });
    },

    updateHelpRequest: (requestData) => {
      dispatch({ type: actionTypes.UPDATE_HELP_REQUEST, payload: requestData });
    },

    volunteerForRequest: (requestId, volunteer) => {
      dispatch({
        type: actionTypes.VOLUNTEER_FOR_REQUEST,
        payload: { requestId, volunteer }
      });
      
      actions.addNotification({
        id: uuidv4(),
        type: 'success',
        message: 'Successfully volunteered for help request!',
        timestamp: new Date().toISOString()
      });
    },

    setFilters: (filters) => {
      dispatch({ type: actionTypes.SET_FILTERS, payload: filters });
    },

    addNotification: (notification) => {
      const notificationWithId = {
        ...notification,
        id: notification.id || uuidv4()
      };
      dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: notificationWithId });
      
      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        actions.removeNotification(notificationWithId.id);
      }, 5000);
    },

    removeNotification: (notificationId) => {
      dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: notificationId });
    }
  };

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        actions.loginUser(userData);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;