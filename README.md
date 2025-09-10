
# 🆘 Community Resource & Help Hub

A full-stack web application that connects people in need with verified local volunteers, NGOs, and authorities for real-time help and assistance.

## 🔧 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Leaflet.js
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB Atlas (via Mongoose)
- **Authentication**: JWT, Firebase Auth (OTP)
- **Hosting**: Vercel (Frontend), Render (Backend)
- **Storage**: AWS S3 (for image uploads)

## ✅ MVP Features (Minimum Viable Product)

- User Registration & Role Selection (Requester, Volunteer, Admin)
- Post a Help Request with category, location, and urgency
- View requests on a map (Leaflet.js)
- Claim requests and chat in real-time (Socket.io)
- Report inappropriate requests (misuse prevention)
- Admin Dashboard to manage requests and reports

## 🚀 Setup Instructions

### Frontend
```bash
cd client
npm install
npm start
```

### Backend
```bash
cd server
npm install
npm run dev
```

## 📦 Project Structure
```
community-help-hub/
├── client/    # React frontend
└── server/    # Node backend
```

## 📋 Upcoming Features
- AI-based request prioritization
- Multilingual support for rural access
- Gamified volunteer recognition

## 📸 Screenshots / UI Mockups
*(Add Figma link or screenshots here)*

## 📜 License
MIT
