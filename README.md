# 🏆 **ScorePoint API**

A **FastAPI**-powered backend for managing **sports, teams, players, and scores** with robust authentication, detailed leaderboards, and enhanced player management.

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

ScorePoint API provides a comprehensive set of endpoints for:

- ✅ **User Authentication:** Registration and secure login using JWT.
- ✅ **Sports Management:** Create, retrieve, update, and delete sports with detailed categories.
- ✅ **Team Management:** Create, retrieve, update, and delete teams, including player assignments and bonus point management.
- ✅ **Player Management:** Manage player information and assignments to teams.
- ✅ **Score Management:** Submit and retrieve player and team scores for various sports.
- ✅ **Leaderboards:** Generate dynamic leaderboards for teams, filtered by sport.

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
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate   # On Windows
```

3️⃣ **Install dependencies:**

```bash
pip install -r requirements.txt
```

4️⃣ **Run the FastAPI application:**

```bash
uvicorn main:app --reload
```

The API will be available at: `http://127.0.0.1:8000`  
Swagger Docs: `http://127.0.0.1:8000/docs`  
Redoc Docs: `http://127.0.0.1:8000/redoc`

---

## 📡 **API Endpoints**

### 🔍 **Health Check**

Check if the API is running.

**HTTP**  
`GET /`

**✅ Response:**  
```json
{
  "status": "ok"
}
```

### 👤 **User Authentication**

#### Register a New User

**HTTP**  
`POST /api/users/register`

**✅ Request Body:**  
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**✅ Response:**  
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "User registered successfully"
}
```

#### User Login (JWT Authentication)

**HTTP**  
`POST /api/auth/login`

**✅ Request Body (Form Data):**  
```text
username=john@example.com&password=securepassword&grant_type=password
```

**✅ Response:**  
```json
{
  "access_token": "your.jwt.token",
  "token_type": "bearer"
}
```

### 👥 **Team Management**

#### Get All Teams

**HTTP**  
`GET /api/teams/`

**✅ Response:**  
200 OK (List of Teams)

#### Get a Team by ID

**HTTP**  
`GET /api/teams/{team_id}`

**✅ Response:**  
200 OK (Team Details)

#### Create a New Team

**HTTP**  
`POST /api/teams/`

**✅ Request Body:**  
```json
{
  "name": "Team A",
  "players": [
    {"name": "Player 1"},
    {"name": "Player 2"}
  ]
}
```

**✅ Response:**  
200 OK (Created Team)

🔐 **Security:** Requires authentication.

#### Update a Team

**HTTP**  
`PUT /api/teams/{team_id}`

**✅ Request Body:**  
```json
{
  "name": "Updated Team A",
  "players": [
    {"id": 1, "name": "Updated Player 1"}
  ]
}
```

**✅ Response:**  
200 OK (Updated Team)

🔐 **Security:** Requires authentication.

#### Delete a Team

**HTTP**  
`DELETE /api/teams/{team_id}`

**✅ Response:**  
204 No Content

🔐 **Security:** Requires authentication.

#### Add Team Bonus

**HTTP**  
`POST /api/teams/{team_id}/sports/{sport_id}/bonus?bonus={bonus_points}`

**✅ Response:**  
200 OK (Bonus Added)

🔐 **Security:** Requires authentication.

### 🏅 **Sports Management**

#### Get All Sports

**HTTP**  
`GET /api/sports/`

**✅ Response:**  
200 OK (List of Sports)

#### Get a Sport by ID

**HTTP**  
`GET /api/sports/{sport_id}`

**✅ Response:**  
200 OK (Sport Details)

#### Create a New Sport

**HTTP**  
`POST /api/sports/`

**✅ Request Body:**  
```json
{
  "name": "Badminton",
  "category": "Singles"
}
```

**✅ Response:**  
200 OK (Created Sport)

🔐 **Security:** Requires authentication.

#### Update a Sport

**HTTP**  
`PUT /api/sports/{sport_id}`

**✅ Request Body:**  
```json
{
  "name": "Updated Badminton",
  "category": "Doubles"
}
```

**✅ Response:**  
200 OK (Updated Sport)

🔐 **Security:** Requires authentication.

#### Delete a Sport

**HTTP**  
`DELETE /api/sports/{sport_id}`

**✅ Response:**  
204 No Content

🔐 **Security:** Requires authentication.

### 🎯 **Score Management**

#### Submit Player Points

**HTTP**  
`POST /api/points/submit/{player_id}/{sport_id}?points={points_earned}`

**✅ Response:**  
200 OK (Updated Player Points)

🔐 **Security:** Requires authentication.

#### Get Player Points

**HTTP**  
`GET /api/points/player/{player_id}/{sport_id}`

**✅ Response:**  
200 OK (Player Points Details)

#### Get Team Points

**HTTP**  
`GET /api/points/team/{team_id}/{sport_id}`

**✅ Response:**  
200 OK (Team Points Details)

### 📊 **Leaderboards**

#### Get Team Leaderboard

**HTTP**  
`GET /api/points/leaderboard?sport_id={sport_id}`

**✅ Query Parameter (Optional):**  
`sport_id` (Filter by sport)

**✅ Response:**  
```json
[
  {
    "team_name": "Team A",
    "sports_scores": {
      "Badminton": 100,
      "Carrom": 50,
      "Table Tennis": 75
    },
    "bonus_points": 25,
    "total_points": 250
  },
  {
    "team_name": "Team B",
    "sports_scores": {
      "Badminton": 80,
      "Carrom": 60,
      "Table Tennis": 90
    },
    "bonus_points": 10,
    "total_points": 240
  }
]
```

🔐 **Public API:** No authentication required.

---

## 🔐 **Security**

- JWT Authentication (OAuth2PasswordBearer) is required for most API calls.
- Unauthorized requests will return a `401 Unauthorized` response.
- Login is done via form data (`application/x-www-form-urlencoded`).

---

## ❌ **Error Handling**

- ✅ **Validation Errors (422 Unprocessable Entity):**
  ```json
  {
    "detail": [
      {
        "loc": ["body", "email"],
        "msg": "Invalid email format",
        "type": "value_error.email"
      }
    ]
  }
  ```

- ✅ **Unauthorized (401 Unauthorized):**
  (Returned for requests that require authentication without a valid token)
```

