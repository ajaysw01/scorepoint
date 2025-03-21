# 🏆 **ScorePoint API**

A **FastAPI**-powered backend for managing **sports, teams, players, and scores** with robust authentication, detailed leaderboards, and enhanced player management.

## 📌 **Introduction**

- ✅ **User Authentication:** Registration and secure login using JWT.
- ✅ **Sports Management:** Create, retrieve, update, and delete sports with detailed categories.
- ✅ **Team Management:** Create, retrieve, update, and delete teams, including player assignments and bonus point management.
- ✅ **Player Management:** Manage player information and assignments to teams.
- ✅ **Score Management:** Submit and retrieve player and team scores for various sports.
- ✅ **Leaderboards:** Generate dynamic leaderboards for teams, filtered by sport.

---


Here’s a well-formatted version of your setup instructions:  

---

# **Setup Instructions for ScorePoint Backend**  

### **1. Connect to the Server**  
Open Git Bash and connect to your Ubuntu instance:  
```sh
ssh -i cs-sports.pem ubuntu@18.201.173.70
```



---

### **2. Clone the Git Repository**  
```sh
git clone https://github.com/ajaysw01/scorepoint
cd scorepoint/backend
```
---

### **3. Create a Virtual Environment**  
```sh
python -m venv venv
source venv/bin/activate  
```
---

### **4. Install Dependencies**  
#### **Install Python**  
```sh
sudo apt update && sudo apt install -y python3 python3-pip python3-venv
```

#### **Install PostgreSQL**  
For **Ubuntu/Debian**:  
```sh
sudo apt update && sudo apt install postgresql-client -y
```
For **Amazon Linux/CentOS**:  
```sh
sudo yum install postgresql -y
```

#### **Install Additional PostgreSQL Dependencies**  
```sh
sudo apt update && sudo apt install -y python3-dev libpq-dev postgresql postgresql-contrib
pip install psycopg2
pip install psycopg2-binary
```

#### **Install Python Packages**  
```sh
pip install -r requirements.txt
```

---

### **5. Configure Environment Variables**  
```sh
vi .env
```
(Add the necessary environment variables inside `.env` file)

---

### **6. Setup Nginx**  
```sh
sudo apt install nginx
cd /etc/nginx/sites-enabled/
sudo nano fastapi_nginx
```
#### **Nginx Configuration File (`fastapi_nginx`)**  
```nginx
server {
    listen 80;
    server_name http://18.201.173.70;
    location / {
        proxy_pass http://127.0.0.1:8000;
    }
}
```
Save the file and restart Nginx:  
```sh
sudo service nginx restart
```

---

### **7. Start the FastAPI Server**  
```sh
cd scorepoint/backend
nohup uvicorn main:app --host 0.0.0.0 --port 8000 > uvicorn.log 2>&1 &
```

Now your **FastAPI backend** should be running and accessible via **Nginx**. 🚀

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
# ScorePoint API Documentation

## Overview
ScorePoint is a comprehensive sports management and scoring application with endpoints for user management, team creation, sports tracking, and point scoring.

## Base URL
`http://localhost:8000/api`

## Authentication
Most endpoints require Bearer Token authentication. Obtain a token via the login endpoint.

## Endpoints

### User Endpoints

#### 1. User Registration
- **URL:** `/users/register`
- **Method:** `POST`
- **Request Body:**
```json
{
   "name": "string",
   "email": "string",
   "password": "string"
}
```
- **Response:**
```json
{
    "name": "string",
    "email": "string",
    "message": "string"
}
```

#### 2. User Login
- **URL:** `/auth/login`
- **Method:** `POST`
- **Request Body (Form Data):**
  - `username`: User email
  - `password`: User password
- **Response:**
```json
{
    "access_token": "string",
    "message": "string"
}
```

### Team Endpoints

#### 1. Create Team
- **URL:** `/teams`
- **Method:** `POST`
- **Requires Authentication**
- **Request Body:**
```json
{
  "name": "Warriors",
  "players": [
    { "name": "Player 1" },
    { "name": "Player 2" }
  ]
}
```
- **Response:** Team details with created players

#### 2. Get All Teams
- **URL:** `/teams`
- **Method:** `GET`
- **Response:** List of all teams

#### 3. Get Team by ID
- **URL:** `/teams/{teamId}`
- **Method:** `GET`
- **Response:** Specific team details

#### 4. Update Team
- **URL:** `/teams/{teamId}`
- **Method:** `PUT`
- **Requires Authentication**
- **Request Body:**
```json
{
  "name": "Updated Team Name",
  "players": [
    { "id": 1, "name": "Updated Player 1" },
    { "id": 2, "name": "Updated Player 2" }
  ]
}
```

#### 5. Delete Team
- **URL:** `/teams/{teamId}`
- **Method:** `DELETE`
- **Requires Authentication**

### Sports Endpoints

#### 1. Create Sport
- **URL:** `/sports`
- **Method:** `POST`
- **Requires Authentication**
- **Request Body:**
```json
{
  "name": "Table Tennis"
}
```

#### 2. Get All Sports
- **URL:** `/sports`
- **Method:** `GET`
- **Requires Authentication**

#### 3. Get Sport by ID
- **URL:** `/sports/{sportId}`
- **Method:** `GET`
- **Requires Authentication**

#### 4. Update Sport
- **URL:** `/sports/{sportId}`
- **Method:** `PUT`
- **Requires Authentication**
- **Request Body:**
```json
{
  "name": "Updated Sport Name"
}
```

#### 5. Delete Sport
- **URL:** `/sports/{sportId}`
- **Method:** `DELETE`
- **Requires Authentication**

### Points Endpoints

#### 1. Submit Player Points
- **URL:** `/points/player/submit`
- **Method:** `POST`
- **Requires Authentication**
- **Request Body:**
```json
{
  "player_id": 2,
  "sport_id": 2,
  "category": "men_doubles",
  "competition_level": "match1",
  "points": 10
}
```

#### 2. Get Player Points by Category
- **URL:** `/points/player/category/{categoryId}`
- **Method:** `GET`
- **Requires Authentication**

#### 3. Get Player Points by Sport
- **URL:** `/points/player/sport/{sportId}`
- **Method:** `GET`

#### 4. Get Player Rankings
- **URL:** `/points/player/rankings`
- **Method:** `GET`
- **Requires Authentication**

#### 5. Get Team Points by Sport
- **URL:** `/points/team/sport/{sportId}`
- **Method:** `GET`

#### 6. Get Team Points by Category
- **URL:** `/points/team/category/{categoryId}`
- **Method:** `GET`

#### 7. Get Total Team Points
- **URL:** `/points/team/total/{teamId}`
- **Method:** `GET`

#### 8. Add Team Bonus Points
- **URL:** `/points/team/bonus`
- **Method:** `POST`
- **Requires Authentication**
- **Request Body:**
```json
{
  "team_id": 1,
  "sport_id": 2,
  "bonus_points": 200
}
```

#### 9. Get Leaderboard
- **URL:** `/points/leaderboard`
- **Method:** `GET`

## Health Check
- **URL:** `/healthz`
- **Method:** `GET`
- **Response:**
```json
{
    "status": "healthy"
}
```

## Authentication
- Most endpoints require a JWT token obtained from the login endpoint
- Include the token in the Authorization header: `Bearer <token>`

## Error Handling
The API includes custom exception handlers for various scenarios like:
- Authentication failures
- User not found
- Invalid credentials
- User already exists

## Contributing
Please read the contributing guidelines before submitting pull requests.

## License

C : Ajay Wankhade
