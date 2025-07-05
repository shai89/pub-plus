# Pub-Plus ✅

Internal employee status tracking system – allows team members to update and view real-time availability (Working, Working Remotely, On Vacation, Business Trip, etc.).

---

## 🛠 Tech Stack

- **Backend:** Django 5.2 + Django REST Framework + JWT (SimpleJWT)
- **Frontend:** React + Vite + Tailwind CSS
- **Database:** PostgreSQL
- **Deployment:** Docker + Docker Compose
- **Authentication:** JWT (access + refresh tokens)

---

## 📁 Project Structure
pub-plus/
├── backend/ # Django apps: accounts, employee_status
├── frontend/ # React app
├── docker-compose.yml # Docker setup for backend + frontend
└── README.md


## 🚀 Run Locally (Without Docker)

### 1. Backend

```bash
cd backend

# (Optional) Setup virtual environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run DB migrations
python manage.py migrate

# Create test users
python manage.py create_test_users --reset

# Start development server
python manage.py runserver
```

## Frontend

cd frontend

# Install dependencies
npm install

# Start dev server (default: http://localhost:5173)
npm run dev

## Run with Docker

# Build and run containers
docker-compose up --build


Services will be available at:
Frontend: http://localhost:5173

Backend API: http://localhost:8000

Django Admin: http://localhost:8000/admin

## Test Users
alice@example.com   / test1234
john@example.com     / teset1234


## Create/Delete Dummy Users

# Create only (skip if users already exist)
python manage.py create_test_users --create-only

# Delete only (superusers are not affected)
python manage.py create_test_users --delete-only

# Reset: delete all test users and recreate them
python manage.py create_test_users --reset


⚠️ Disclaimer: Not a Production-Ready System
This project was built as a demo / technical assignment to showcase architecture, code quality, and practical decision-making under realistic time constraints.

As such, several simplifications and trade-offs were intentionally made to optimize development speed and clarity:

🔐 Authentication / Security
Passwords are stored in plain text in the code (for test users only).

No HTTPS or CSRF protection is configured – Django runs in development mode.

Admin credentials are exposed intentionally to allow easy testing.

Why it's OK here:
This is a controlled, local environment with no real users, no internet exposure, and no production data.