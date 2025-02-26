# 🏆 **ScorePoint API**  

A **FastAPI**-powered backend for managing **sports, teams, players, and scores** with authentication and leaderboards.

## 📑 **Table of Contents**  

- [📌 Introduction](#-introduction)  
- [🚀 Getting Started](#-getting-started)  
- [📡 API Endpoints](#-api-endpoints)  
  - [🔍 Health Check](#-health-check)  
  - [👤 User Authentication](#-user-authentication)  
  - [👥 Team Management](#-team-management)  
  - [🏅 Sports Management](#-sports-management)  
  - [🎯 Score Management](#-score-management)  
  - [📊 Leaderboards](#-leaderboards)  
- [🔐 Security](#-security)  
- [❌ Error Handling](#-error-handling)  

---

## 📌 **Introduction**  

ScorePoint API provides endpoints for:  
✅ **User authentication** (registration & login)  
✅ **Managing sports** (create, read, update, delete)  
✅ **Managing teams** (create, read, update, delete)  
✅ **Recording player scores** (submit, retrieve)  
✅ **Generating leaderboards** for teams and players  

---

## 🚀 **Getting Started**  

### **🔧 Setup Instructions**  

1️⃣ **Clone the repository:**  
```bash
git clone <repository_url>
cd scorepoint-backend
```

2️⃣ **Create a virtual environment & activate it:**  
```bash
python -m venv venv
source venv/bin/activate   # On macOS/Linux
venv\Scripts\activate      # On Windows
```

3️⃣ **Install dependencies:**  
```bash
pip install -r requirements.txt
```

4️⃣ **Set Up Environment Variables**  
Create a `.env` file in the project root and add:  
```env
DATABASE_URL=postgresql://username:password@localhost/sports_db
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

5️⃣ **Run Database Migrations**  
```bash
alembic upgrade head
```

6️⃣ **Run the FastAPI application:**  
```bash
uvicorn main:app --reload
```
   - The API will be available at: **http://127.0.0.1:8000**
   - Swagger Docs: **http://127.0.0.1:8000/docs**  
   - Redoc Docs: **http://127.0.0.1:8000/redoc**  

---

## 📡 **API Endpoints**  

### 🔍 **Health Check**  

**Check if API is running**  
```http
GET /
```
✅ **Response:**  
```json
{"status": "ok"}
```

---

## 👤 **User Authentication**  

### **Register a New User**  
```http
POST /api/users/register
```
✅ **Request Body:**  
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
✅ **Response:**  
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "User registered successfully"
}
```

### **User Login (Token-Based Authentication)**
```http
POST /api/auth/login
```
✅ **Response:**  
```json
{
  "access_token": "your.jwt.token",
  "token_type": "bearer"
}
```

---

## 👥 **Team Management**  

### **Get All Teams**
```http
GET /api/teams/
```
✅ **Response:** `200 OK` (List of Teams)

### **Create a New Team**
```http
POST /api/teams/
```
✅ **Request Body:**  
```json
{
  "name": "Team A",
  "players": [1, 2, 3]
}
```
✅ **Response:** `200 OK` (Created Team)  
🔐 **Security:** Requires authentication.

---

## 🏅 **Sports Management**  

### **Get All Sports**
```http
GET /api/sports/
```
✅ **Response:** `200 OK` (List of Sports)

### **Create a New Sport**
```http
POST /api/sports/
```
✅ **Request Body:**  
```json
{
  "name": "Badminton",
  "category": "Singles"
}
```
✅ **Response:** `200 OK` (Created Sport)  
🔐 **Security:** Requires authentication.

---

## 🎯 **Score Management**  

### **Submit a Player's Score**
```http
POST /api/scores/
```
✅ **Request Body:**  
```json
{
  "player_id": 1,
  "sport_id": 2,
  "points": 20
}
```
✅ **Response:** `200 OK` (Updated Score)  
🔐 **Security:** Requires authentication.

### **Get Player's Score**
```http
GET /api/scores/player/{player_id}
```
✅ **Response:** `200 OK` (Player's Total Score)

---

## 📊 **Leaderboards**  

### **Get Team Leaderboard**
```http
GET /api/leaderboard
```
✅ **Query Parameter (Optional):**  
- `sport_id` (Filter by sport)  

✅ **Response:**  
```json
[
    {
        "team_name": "Team A",
        "scores_per_game": {
            "Badminton": 100,
            "Carrom": 50,
            "Table Tennis": 75
        },
        "bonus_points": 10,
        "total_score": 235
    },
    {
        "team_name": "Team B",
        "scores_per_game": {
            "Badminton": 80,
            "Carrom": 60,
            "Table Tennis": 90
        },
        "bonus_points": 5,
        "total_score": 235
    }
]
```
🔐 **Public API**: No authentication required.  

---

## 🔐 **Security**  

- **JWT Authentication** (`OAuth2PasswordBearer`) is required for most API calls.
- **Unauthorized requests** will return a `401 Unauthorized` response.

---

## ❌ **Error Handling**  

✅ **Validation Errors (`422`)**  
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "Invalid email format",
      "type": "value_error"
    }
  ]
}
```

✅ **Unauthorized (`401`)**  
```json
{
  "detail": "Invalid credentials"
}
```

✅ **Not Found (`404`)**  
```json
{
  "detail": "Resource not found"
}
```

---

## 🛠 **Future Improvements**
- ✅ Role-Based Access Control (RBAC)  
- ✅ Email Verification & Password Reset  
- ✅ WebSockets for Real-Time Score Updates  

---

## 🤝 **Contributing**
1. Fork the repository  
2. Create a new feature branch  
3. Commit your changes  
4. Push to your fork  
5. Open a pull request  

---

## 📜 **License**
This project is licensed under the **MIT License**.

