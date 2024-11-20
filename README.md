# Virtual Event Management

## Project Overview
This is the backend system for a Virtual Event Management Platform. It provides APIs for managing users, events, and participants, focusing on user authentication, event scheduling, and participant registrations. The platform is designed for scalability and security, with options to integrate with either in-memory data structures or databases (SQL/NoSQL).

## Installation Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/news-aggregator-api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd virtual-event-management-backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables by creating a `.env` file:
    ```env
    PORT=3000
    JWT_Secret="your secret key"
    ```
5. Start the server:
    ```bash
    npm start
    ```
## API Endpoint Documentation

### User Register
- **URL:** `/users/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
    ```json
    {
        "username": "newuser",
        "email": "newuser@example.com",
        "password": "securepassword"
    }
    ```
- **Response:**
    ```json
    {
        "id": "1",
        "username": "newuser",
        "email": "newuser@example.com",
        "createdAt": "2023-10-01T12:00:00Z"
    }
    ```

### User Login
- **URL:** `/users/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a token.
- **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "securepassword"
    }
    ```
- **Response:**
    ```json
    {
        "token": "your_jwt_token"
    }
    ```


    #### Create Event
    - **Endpoint:** `/api/events`
    - **Method:** `POST`
    - **Description:** Creates a new event.
    - **Request Body:**
        ```json
        {
            "title": "string",
            "description": "string",
            "date": "string (ISO 8601 format)",
            "location": "string"
        }
        ```
    - **Response:**
        - **201 Created:** Event successfully created.
            ```json
            {
                "id": "string",
                "title": "string",
                "description": "string",
                "date": "string (ISO 8601 format)",
                "location": "string"
            }
            ```
        - **400 Bad Request:** Invalid input data.

    #### Get Events
    - **Endpoint:** `/api/events`
    - **Method:** `GET`
    - **Description:** Retrieves a list of all events.
    - **Response:**
        - **200 OK:** Successfully retrieved list of events.
            ```json
            [
                {
                    "id": "string",
                    "title": "string",
                    "description": "string",
                    "date": "string (ISO 8601 format)",
                    "location": "string"
                },
                ...
            ]
            ```

    #### Update Event
    - **Endpoint:** `/api/events/{id}`
    - **Method:** `PUT`
    - **Description:** Updates an existing event by ID.
    - **Path Parameters:**
        - `id` (string): The ID of the event to update.
    - **Request Body:**
        ```json
        {
            "title": "string",
            "description": "string",
            "date": "string (ISO 8601 format)",
            "location": "string"
        }
        ```
    - **Response:**
        - **200 OK:** Event successfully updated.
            ```json
            {
                "id": "string",
                "title": "string",
                "description": "string",
                "date": "string (ISO 8601 format)",
                "location": "string"
            }
            ```
        - **400 Bad Request:** Invalid input data.
        - **404 Not Found:** Event not found.

    #### Delete Event
    - **Endpoint:** `/api/events/{id}`
    - **Method:** `DELETE`
    - **Description:** Deletes an existing event by ID.
    - **Path Parameters:**
        - `id` (string): The ID of the event to delete.
    - **Response:**
        - **204 No Content:** Event successfully deleted.
        - **404 Not Found:** Event not found.
    
    #### Register for Event
    - **Endpoint:** `/api/events/{id}/register`
    - **Method:** `POST`
    - **Description:** Registers a user for an event.
    - **Path Parameters:**
        - `id` (string): The ID of the event to register for.
    - **Request Body:**
        ```json
        {
            "userId": "string"
        }
        ```
    - **Response:**
        - **201 Created:** User successfully registered for the event.
            ```json
            {
                "eventId": "string",
                "userId": "string",
                "registrationDate": "string (ISO 8601 format)"
            }
            ```
        - **400 Bad Request:** Invalid input data.
        - **404 Not Found:** Event or user not found