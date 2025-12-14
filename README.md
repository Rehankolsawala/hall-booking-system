# Hall Booking System

A full-stack Hall Booking System built using Django REST Framework and React (Vite).

## Tech Stack
- Backend: Django, Django REST Framework
- Frontend: React, Vite
- Database: PostgreSQL
- Styling: CSS

## Features
- Create booking
- View all bookings
- Update booking
- Delete booking
- REST API integration
- Responsive UI

hall-booking-system/
│
├── backend/
│   ├── bookings/
│   ├── config/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md


## API Endpoints
- GET /api/bookings/
- POST /api/bookings/create/
- PUT /api/bookings/update/<id>/
- DELETE /api/bookings/delete/<id>/

## How to Run
🖥 Backend (Django)
Navigate to backend folder:
cd backend
Create virtual environment:
python -m venv venv
Activate virtual environment:
venv\Scripts\activate

## Start Django server:
python manage.py runserver
## Backend will run at:

http://127.0.0.1:8000

## Frontend (React + Vite)

Navigate to frontend folder:

## Start frontend server:

npm run dev

## Frontend will run at:

http://localhost:5173



## Key Concepts Used
Django ORM for database operations
RESTful API design
React Hooks (useState, useEffect)
Component-based UI
Environment-based configuration
Client–server architecture