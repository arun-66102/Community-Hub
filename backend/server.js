const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory storage (replace with DB in production)
const db = {
  helpRequests: [
    {
      id: '1',
      title: 'Need food supplies for elderly neighbors',
      description: 'Looking for volunteers to help deliver groceries to elderly residents in downtown area.',
      category: 'food',
      urgency: 'medium',
      location: { lat: 40.7128, lng: -74.006, address: 'New York, NY' },
      requester: { name: 'Sarah Johnson', role: 'needsHelp' },
      volunteers: [],
      status: 'open',
      createdAt: new Date().toISOString(),
      contactInfo: 'sarah.j@email.com'
    }
  ],
  users: []
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Community Hub API is running' });
});

// Help Requests CRUD
app.get('/api/help-requests', (req, res) => {
  res.json(db.helpRequests);
});

app.post('/api/help-requests', (req, res) => {
  const newRequest = {
    id: uuidv4(),
    ...req.body,
    volunteers: [],
    status: 'open',
    createdAt: new Date().toISOString()
  };
  db.helpRequests.push(newRequest);
  res.status(201).json(newRequest);
});

app.get('/api/help-requests/:id', (req, res) => {
  const requestItem = db.helpRequests.find(reqItem => reqItem.id === req.params.id);
  if (!requestItem) {
    return res.status(404).json({ message: 'Help request not found' });
  }
  res.json(requestItem);
});

app.put('/api/help-requests/:id', (req, res) => {
  const index = db.helpRequests.findIndex(reqItem => reqItem.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Help request not found' });
  }
  db.helpRequests[index] = { ...db.helpRequests[index], ...req.body };
  res.json(db.helpRequests[index]);
});

app.delete('/api/help-requests/:id', (req, res) => {
  const index = db.helpRequests.findIndex(reqItem => reqItem.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Help request not found' });
  }
  db.helpRequests.splice(index, 1);
  res.json({ message: 'Help request deleted' });
});

app.post('/api/help-requests/:id/volunteer', (req, res) => {
  const { id } = req.params;
  const { volunteer } = req.body;
  const requestItem = db.helpRequests.find(reqItem => reqItem.id === id);
  if (!requestItem) {
    return res.status(404).json({ message: 'Help request not found' });
  }
  if (!volunteer || !volunteer.id) {
    return res.status(400).json({ message: 'Invalid volunteer data' });
  }
  const alreadyVolunteered = requestItem.volunteers.some(v => v.id === volunteer.id);
  if (alreadyVolunteered) {
    return res.status(400).json({ message: 'Volunteer already joined' });
  }
  requestItem.volunteers.push({ ...volunteer, joinedAt: new Date().toISOString() });
  res.json(requestItem);
});

// Auth (mock)
app.post('/api/auth/login', (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ message: 'Name, email, and role are required' });
  }
  const user = {
    id: uuidv4(),
    name,
    email,
    role,
    isAuthenticated: true
  };
  db.users.push(user);
  res.json(user);
});

// Analytics
app.get('/api/stats/overview', (req, res) => {
  const total = db.helpRequests.length;
  const open = db.helpRequests.filter(r => r.status === 'open').length;
  const critical = db.helpRequests.filter(r => r.urgency === 'critical').length;
  const volunteers = db.helpRequests.reduce((acc, r) => acc + r.volunteers.length, 0);
  res.json({ total, open, critical, volunteers });
});

// Serve client in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.resolve(__dirname, '..', 'dist');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
