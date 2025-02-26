# ScorePoint API

This repository contains the API for ScorePoint, a service for managing sports, teams, players, and scores.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [Health Check](#health-check)
  - [User Registration](#user-registration)
  - [Authentication](#authentication)
  - [Team Endpoints](#team-endpoints)
  - [Sports Endpoints](#sports-endpoints)
  - [Score Endpoints](#score-endpoints)
- [Schemas](#schemas)
- [Security](#security)
- [Error Handling](#error-handling)

## Introduction

The ScorePoint API provides endpoints for:

- Managing users (registration, login)
- Managing sports (create, read, update, delete)
- Managing teams (create, read, update, delete)
- Managing player scores (submit, get player score, get team score)
- Retrieving leaderboards

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```
2.  **Install dependencies:** (Assuming you are using Python and a framework like FastAPI)
    ```bash
    pip install -r requirements.txt
    ```
3.  **Run the application:**
    ```bash
    uvicorn main:app --reload
    ```
    (Replace `main:app` with your application entry point.)

## API Endpoints

### Health Check

-   **`/` (GET)**: Checks the API's health.
    -   Response: `200 OK`

### User Registration

-   **`/api/users/register` (POST)**: Registers a new user.
    -   Request Body: `UserRegister` schema (name, email, password)
    -   Response: `201 Created` with `UserResponse` schema (name, email, message)
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.

### Authentication

-   **`/api/auth/login` (POST)**: Logs in a user and provides an access token.
    -   Request Body: `application/x-www-form-urlencoded` with `Body_login_api_auth_login_post` schema (username, password).
    -   Response: `200 OK` with access token.
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.

### Team Endpoints

-   **`/api/teams/` (GET)**: Retrieves all teams with their players.
    -   Response: `200 OK` with an array of `TeamResponse` schemas.
-   **`/api/teams/` (POST)**: Creates a new team.
    -   Request Body: `TeamCreate` schema (name, players).
    -   Response: `200 OK` with `TeamResponse` schema.
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.
    -   Security: Requires authentication (OAuth2PasswordBearer).
-   **`/api/teams/{team_id}` (GET)**: Retrieves a specific team by ID.
    -   Parameters: `team_id` (integer, path parameter).
    -   Response: `200 OK` with `TeamResponse` schema.
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.
    -   Security: Requires authentication (OAuth2PasswordBearer).
-   **`/api/teams/{team_id}` (PUT)**: Updates a team's information.
    -   Parameters: `team_id` (integer, path parameter).
    -   Request Body: `TeamUpdate` schema (name, players).
    -   Response: `200 OK` with `TeamResponse` schema.
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.
    -   Security: Requires authentication (OAuth2PasswordBearer). Team owner only.
-   **`/api/teams/{team_id}` (DELETE)**: Deletes a team and its players.
    -   Parameters: `team_id` (integer, path parameter).
    -   Response: `200 OK`.
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.
    -   Security: Requires authentication (OAuth2PasswordBearer). Team owner only.

### Sports Endpoints

-   **`/api/sports/` (GET)**: Retrieves all sports.
    -   Response: `200 OK` with an array of `SportResponse` schemas.
-   **`/api/sports/` (POST)**: Creates a new sport.
    -   Request Body: `SportCreate` schema (name, category).
    -   Response: `200 OK` with `SportResponse` schema.
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.
    -   Security: Requires authentication (OAuth2PasswordBearer).
-   **`/api/sports/{sport_id}` (GET)**: Retrieves a specific sport by ID.
    -   Parameters: `sport_id` (integer, path parameter).
    -   Response: `200 OK` with `SportResponse` schema.
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.
-   **`/api/sports/{sport_id}` (PUT)**: Updates a sport's information.
    -   Parameters: `sport_id` (integer, path parameter).
    -   Request Body: `SportUpdate` schema (name, category).
    -   Response: `200 OK` with `SportResponse` schema.
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.
    -   Security: Requires authentication (OAuth2PasswordBearer).
-   **`/api/sports/{sport_id}` (DELETE)**: Deletes a sport.
    -   Parameters: `sport_id` (integer, path parameter).
    -   Response: `200 OK`.
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.
    -   Security: Requires authentication (OAuth2PasswordBearer).

### Score Endpoints

-   **`/api/scores/{player_id}/{sport_id}` (POST)**: Submits a player's score.
    -   Parameters: `player_id`, `sport_id` (integer, path parameters), `points` (integer, query parameter).
    -   Response: `200 OK` with `PlayerScoreResponse` schema.
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.
    -   Security: Requires authentication (OAuth2PasswordBearer).
-   **`/api/scores/player/{player_id}/{sport_id}` (GET)**: Retrieves a player's score for a specific sport.
    -   Parameters: `player_id`, `sport_id` (integer, path parameters).
    -   Response: `200 OK` with `PlayerScoreResponse` schema.
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.
-   **`/api/scores/team/{team_id}/{sport_id}` (GET)**: Retrieves a team's score for a specific sport.
    -   Parameters: `team_id`, `sport_id` (integer, path parameters).
    -   Response: `200 OK`.
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.
-   **`/api/scores/leaderboard` (GET)**: Retrieves the leaderboard.
    -   Parameters: `sport_id` (integer, optional query parameter).
    -   Response: `200 OK` with an array of `LeaderboardEntry` schemas.
    -   Error: `422 Validation Error` with `HTTPValidationError` schema.

## Schemas

(Refer to the OpenAPI specification for detailed schema definitions.)

## Security

-   Authentication is handled using OAuth2PasswordBearer.
-   Some endpoints require authentication (e.g., creating teams, sports, submitting scores).

## Error Handling

-   Validation errors are returned with a `422` status code and a `HTTPValidationError` schema.
-   Other errors may be returned with appropriate HTTP status codes and error messages.
