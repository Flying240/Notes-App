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
- React.js

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

### Installation:
1. Clone the repository:
   ```bash
   git clone https://github.com/Flying240/Notes-App.git
   
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

# Screenshot of this Project:- 

## SignUp Page

![Screenshot 2024-12-08 014132](https://github.com/user-attachments/assets/3390cc4d-1e37-4ed9-96a0-e8179c5ccdbb)

## Login Page (user not found)

![Screenshot 2024-12-08 014229](https://github.com/user-attachments/assets/055500f3-82d4-499f-8453-35f630d8a73e)

## First Visit of User to home page

![Screenshot 2024-12-08 014251](https://github.com/user-attachments/assets/b6d6a633-ec5c-45d6-865a-954110e9bd7e)

## Add Page

![Screenshot 2024-12-08 014343](https://github.com/user-attachments/assets/5768cb6a-84d4-42b2-a71f-e0aa0c3f174d)

## Home Page

![Screenshot 2024-12-08 015033](https://github.com/user-attachments/assets/6f775f84-f0f0-4589-ac0b-b2a5fae0ab08)

## Edit Page

![Screenshot 2024-12-08 014917](https://github.com/user-attachments/assets/2463ed3e-1fcd-4fd0-826f-8a5b6cf67c9b)

## Search 

![Screenshot 2024-12-08 014931](https://github.com/user-attachments/assets/775bcf0e-7a30-4f2d-9a9b-a4e5a40743e7)


## Delete

![Screenshot 2024-12-08 015938](https://github.com/user-attachments/assets/cd24e711-868d-47fb-9477-3e50e7beb42b)

