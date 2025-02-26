# 🏆 ScorePoint API  

A **FastAPI**-powered backend for managing **sports, teams, players, and scores** with authentication and leaderboards.

## 📑 Table of Contents  

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

## 📌 Introduction  

ScorePoint API provides endpoints for:  
✅ **User authentication** (registration & login)  
✅ **Managing sports** (create, read, update, delete)  
✅ **Managing teams** (create, read, update, delete)  
✅ **Recording player scores** (submit, retrieve)  
✅ **Generating leaderboards** for teams and players  

---

## 🚀 Getting Started  

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

4️⃣ **Run the FastAPI application:**  
```bash
uvicorn main:app --reload
```
   - The API will be available at: **http://127.0.0.1:8000**
   - Swagger Docs: **http://127.0.0.1:8000/docs**  
   - Redoc Docs: **http://127.0.0.1:8000/redoc**  

---

## 📡 API Endpoints  

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
❌ **Errors:** `422 Validation Error`  
🔐 **Security:** Requires authentication.

### **Get Team by ID**
```http
GET /api/teams/{team_id}
```
✅ **Response:** `200 OK` (Team Details)  
🔐 **Security:** Requires authentication.

### **Update Team**
```http
PUT /api/teams/{team_id}
```
✅ **Request Body:**  
```json
{
  "name": "Updated Team",
  "players": [1, 4, 5]
}
```
✅ **Response:** `200 OK` (Updated Team)  
🔐 **Security:** Requires authentication. Team owner only.

### **Delete Team**
```http
DELETE /api/teams/{team_id}
```
✅ **Response:** `200 OK`  
🔐 **Security:** Requires authentication. Team owner only.

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
  "category": "Racket Sport"
}
```
✅ **Response:** `200 OK` (Created Sport)  
🔐 **Security:** Requires authentication.

### **Get Sport by ID**
```http
GET /api/sports/{sport_id}
```
✅ **Response:** `200 OK` (Sport Details)

### **Update Sport**
```http
PUT /api/sports/{sport_id}
```
✅ **Request Body:**  
```json
{
  "name": "Updated Sport",
  "category": "Outdoor"
}
```
✅ **Response:** `200 OK` (Updated Sport)  
🔐 **Security:** Requires authentication.

### **Delete Sport**
```http
DELETE /api/sports/{sport_id}
```
✅ **Response:** `200 OK`  
🔐 **Security:** Requires authentication.

---

## 🎯 **Score Management**  

### **Submit a Player's Score**
```http
POST /api/scores/{player_id}/{sport_id}
```
✅ **Parameters:** `player_id`, `sport_id`, `points`  
✅ **Response:** `200 OK` (Updated Score)  
🔐 **Security:** Requires authentication.

### **Get Player's Score**
```http
GET /api/scores/player/{player_id}/{sport_id}
```
✅ **Response:** `200 OK` (Player's Total Score)

### **Get Team's Score**
```http
GET /api/scores/team/{team_id}/{sport_id}
```
✅ **Response:** `200 OK` (Team's Total Score)

---

## 📊 **Leaderboards**  

### **Get Leaderboard**
```http
GET /api/scores/leaderboard
```
✅ **Parameters:** `sport_id` (optional)  
✅ **Response:** `200 OK` (Leaderboard List)

---

## 🔐 Security  

- **JWT Authentication** (`OAuth2PasswordBearer`) is required for most API calls.
- **Unauthorized requests** will return a `401 Unauthorized` response.

---

## ❌ Error Handling  

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

