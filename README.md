# LeadFlow CRM

LeadFlow is a full-stack CRM application built for the Full Stack CRM Take-Home Assessment. It allows authenticated admins to manage leads, move them through a sales pipeline, capture follow-up notes, and monitor pipeline health through a dashboard.

## Project Overview

The application is designed around a simple sales workflow:

- Admin users log in to access the CRM
- Leads can be created, viewed, updated, deleted, and qualified
- Each lead can store internal notes for follow-ups and context
- A dashboard summarizes pipeline counts and deal value totals
- Users can search, filter, and review lead progress quickly

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs for password hashing

## Features Implemented

- Secure login with JWT-based authentication
- Protected CRM routes after sign-in
- Seeded admin users for evaluation
- Lead CRUD:
  - create leads
  - view all leads
  - view a single lead contextually in the UI
  - edit leads
  - delete leads
- Lead pipeline statuses:
  - New
  - Contacted
  - Qualified
  - Proposal Sent
  - Won
  - Lost
- Quick "Mark qualified" action on lead cards
- Notes per lead:
  - create notes
  - edit notes
  - delete notes
  - pin important notes
  - timeline-style notes UI
- Dashboard metrics:
  - total leads
  - new leads
  - qualified leads
  - won leads
  - lost leads
  - total estimated deal value
  - won revenue
- Search by:
  - lead name
  - company name
  - email
- Filter by:
  - status
  - source
  - assigned salesperson
- Dark mode toggle
- Currency display selector for value presentation
- Toast notifications for create, update, and delete actions

## Demo Credentials

The backend seeds two admin users automatically on server startup:

- `Maya Thompson`  
  Email: `maya.thompson@leadflowcrm.com`  
  Password: `LeadFlow2026!`

- `Daniel Reyes`  
  Email: `daniel.reyes@leadflowcrm.com`  
  Password: `LeadFlow2026!`

If older sample users already exist in the database, the seeder updates them to these newer credentials on restart.

## Project Structure

```text
LeadFlow/
  client/   React + Vite frontend
  server/   Express + MongoDB backend
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd LeadFlow
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Create the backend environment file

Create `server/.env` with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

### 4. Install frontend dependencies

```bash
cd ../client
npm install
```

### 5. Optional frontend environment file

If the frontend should point to a different backend URL, create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

If omitted, the app already defaults to `http://localhost:5000`.

## Running the Application

### Start the backend

From the `server` folder:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

### Start the frontend

From the `client` folder:

```bash
npm run dev
```

The app will usually run on:

```text
http://localhost:5173
```

## Database Setup

- MongoDB is required for persistence
- The app uses the connection string provided in `MONGO_URI`
- On server startup:
  - MongoDB connects through Mongoose
  - default admin users are seeded automatically

Any MongoDB deployment works for this project, including:

- MongoDB Atlas
- local MongoDB Community Server

## API Summary

### Auth

- `POST /api/auth/login`

### Leads

- `POST /api/leads`
- `GET /api/leads`
- `GET /api/leads/:id`
- `PUT /api/leads/:id`
- `DELETE /api/leads/:id`

### Notes

- `POST /api/leads/:id/notes`
- `GET /api/leads/:id/notes`
- `PUT /api/leads/:id/notes/:noteId`
- `DELETE /api/leads/:id/notes/:noteId`
- `PATCH /api/leads/:id/notes/:noteId/pin`

### Dashboard

- `GET /api/dashboard`

### Users

- `GET /api/users/salespeople`

## Manual Testing Notes

The application was tested manually by:

- logging in with seeded admin credentials
- creating new leads
- editing and deleting leads
- marking leads as qualified
- adding, editing, pinning, and deleting notes
- validating dashboard totals after lead status changes
- verifying filters and search
- checking light mode and dark mode behavior
- checking currency display changes

## Known Limitations

- Currency switching is display-based and uses fixed demo conversion rates on the frontend rather than live exchange rates
- Lead timestamps are stored in the backend, but the current UI prioritizes operational fields over showing all timestamp metadata prominently
- Authentication is intentionally simple for assessment purposes and uses seeded admin accounts instead of a full user management flow
- Automated test coverage has not been added yet; current verification is manual

## Reflection

This project focused on building a practical CRM workflow end to end rather than maximizing scope. The main priority was to keep the backend clean, make the lead lifecycle clear, and deliver a frontend that feels like a usable internal sales tool. If I had more time, I would add automated tests, stronger role handling, and a more advanced reporting layer with server-side pagination and analytics.
