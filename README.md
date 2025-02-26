# 🏆 ScorePoint API  

A **FastAPI**-powered backend for managing **sports, teams, players, and scores** with authentication and leaderboards.

## 📑 Table of Contents

- [📌 Introduction](#-introduction)  
- [🚀 Getting Started](#-getting-started)  
- [📡 API Endpoints](#-api-endpoints)  
  - [🔍 Health Check](#-health-check)  
  - [👤 User Authentication](#-user-authentication)  
  - [🏅 Sports Management](#-sports-management)  
  - [👥 Team Management](#-team-management)  
  - [🎯 Score Management](#-score-management)  
  - [📊 Leaderboards](#-leaderboards)  
- [📦 Schemas](#-schemas)  
- [🔐 Security](#-security)  
- [❌ Error Handling](#-error-handling)  
- [⚡ Future Improvements](#-future-improvements)

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

### 👤 **User Authentication**  

#### 🔹 **Register a New User**  
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

#### 🔹 **User Login (Token-Based Authentication)**
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

### 🏅 **Sports Management**  

#### 🔹 **Get All Sports**
```http
GET /api/sports/
```
✅ **Response:**  
```json
[
  {"id": 1, "name": "Badminton", "category": "Singles"},
  {"id": 2, "name": "Cricket", "category": null}
]
```

#### 🔹 **Create a Sport**  
```http
POST /api/sports/
```
✅ **Request Body:**  
```json
{
  "name": "Tennis",
  "category": "Doubles"
}
```
✅ **Response:**  
```json
{
  "id": 3,
  "name": "Tennis",
  "category": "Doubles"
}
```

---

### 👥 **Team Management**  

#### 🔹 **Get All Teams**
```http
GET /api/teams/
```
✅ **Response:**  
```json
[
  {"id": 1, "name": "Team A", "players": [{"id": 5, "name": "Player1"}]},
  {"id": 2, "name": "Team B", "players": [{"id": 6, "name": "Player2"}]}
]
```

#### 🔹 **Create a Team**  
```http
POST /api/teams/
```
✅ **Request Body:**  
```json
{
  "name": "Team Alpha",
  "players": [5, 6]
}
```
✅ **Response:**  
```json
{
  "id": 3,
  "name": "Team Alpha",
  "players": [{"id": 5, "name": "Player1"}, {"id": 6, "name": "Player2"}]
}
```

---

### 🎯 **Score Management**  

#### 🔹 **Submit a Player's Score**  
```http
POST /api/scores/{player_id}/{sport_id}?points=50
```
✅ **Response:**  
```json
{
  "player_id": 5,
  "sport_id": 2,
  "points": 50,
  "total_player_score": 200
}
```

#### 🔹 **Get a Player's Total Score**
```http
GET /api/scores/player/{player_id}/{sport_id}
```
✅ **Response:**  
```json
{
  "player_id": 5,
  "sport_id": 2,
  "total_player_score": 200
}
```

---

### 📊 **Leaderboards**  

#### 🔹 **Get Leaderboard by Team & Sport**
```http
GET /api/scores/leaderboard
```
✅ **Response:**  
```json
[
  {
    "team_name": "Team A",
    "sports": [
      {"sport_name": "Badminton", "total_points": 90},
      {"sport_name": "Cricket", "total_points": 100}
    ]
  },
  {
    "team_name": "Team B",
    "sports": [
      {"sport_name": "Badminton", "total_points": 70}
    ]
  }
]
```

---

## 📦 Schemas  

| Schema                | Description                                        |
|-----------------------|----------------------------------------------------|
| **UserResponse**      | User details upon successful registration/login   |
| **TeamResponse**      | Team details including players                    |
| **SportResponse**     | Sport details including category (singles/doubles) |
| **PlayerScoreResponse** | Score details for a player                        |
| **LeaderboardResponse** | Team-wise leaderboard per sport                  |

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

## ⚡ Future Improvements  

- **Role-based access control** (Admin, Player, Viewer)  
- **More detailed match statistics**  
- **Email verification & password reset**  
- **Webhooks for real-time updates**  

---

## 🌟 Contributing  

1. **Fork the repository**  
2. **Create a feature branch** (`git checkout -b feature-name`)  
3. **Commit your changes** (`git commit -m "Add feature"`)  
4. **Push the branch** (`git push origin feature-name`)  
5. **Create a Pull Request** 🚀  

---

## 📝 License  

This project is licensed under the **MIT License**.  

---

