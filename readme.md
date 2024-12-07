# **Notes App - MERN Stack Application**

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that allows users to manage their personal notes effectively. The application supports user authentication and provides functionalities to create, update, delete, and search notes.

---

## **Features**

### User Management:
- **Sign Up**: Create a new user account.
- **Login**: Authenticate existing users securely using JWT.
- **Get User Details**: Retrieve user details after authentication.

### Note Management:
- **Add Notes**: Add new notes with title, content, and optional tags.
- **Edit Notes**: Update existing notes (title, content, tags, pinned status).
- **Delete Notes**: Remove notes from the user’s account permanently.
- **Get All Notes**: Retrieve all user notes, sorted by pinned status.
- **Search Notes**: Search notes using keywords in title, content, tags, or date.

### Secure APIs:
- **JWT Authentication**: Protect routes and ensure secure access to APIs.
- **Error Handling**: Comprehensive error messages for invalid inputs and server issues.

---

## **Tech Stack**

### Frontend:
- React.js (To be integrated)

### Backend:
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Fast and flexible Node.js web framework.

### Database:
- **MongoDB**: Cloud-based database hosted on MongoDB Atlas.

### Authentication:
- **JSON Web Token (JWT)**: Secure token-based authentication.

### Middleware:
- **CORS**: Handle cross-origin requests.
- **Mongoose**: MongoDB object modeling for Node.js.

---

## **Getting Started**

Follow these instructions to set up and run the application on your local machine:

### Prerequisites:
- [Node.js](https://nodejs.org/) installed on your system.
- A MongoDB Atlas account and connection string.

## To Start/Run open two different terminals to the below described directory and run commands 

    First Type your mongo URL in connectionString in /backend/2_config/config.json file
    
### 1) /backend:-   
    npm install
    npm start
    
### 2) /frontend/react:-
    npm install
    npm install axios
    npm run dev


### Installation:
1. Clone the repository:
   ```bash
   git clone https://github.com/Flying240/Notes-App.git
