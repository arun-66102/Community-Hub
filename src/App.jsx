import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Home from './pages/Home';
import CreateRequest from './pages/CreateRequest';
import RequestDetails from './pages/RequestDetails';
import Profile from './pages/Profile';
import Login from './pages/Login';
import NotificationSystem from './components/NotificationSystem';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-request" element={<CreateRequest />} />
              <Route path="/request/:id" element={<RequestDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <NotificationSystem />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
