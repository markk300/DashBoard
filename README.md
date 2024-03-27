## MERN Fullstack Dashboard

### Overview

This project is a MERN (MongoDB, Express.js, React.js, Node.js) stack application that implements a dashboard for product management. It includes authentication with JSON Web Token (JWT), CRUD functionality, pagination, user profile management, contact us page, and error handling. The frontend is built with React and SCSS, utilizing React Router V6 for routing, Redux Toolkit for state management, and Axios for backend communication. The backend is powered by Express.js, connecting to a MongoDB database.

### Features

- **Authentication**: User registration, login, password reset using JWT.
- **Authorization**: Protects routes to only allow access by logged-in users.
- **CRUD Functionality**: Complete CRUD operations for product management.
- **Pagination**: Implements pagination on the frontend.
- **Frontend Pages**: Includes a dashboard for product management, user profile page, and contact us page.
- **State Management**: Utilizes Redux Toolkit for managing application state.
- **Routing**: Setup routing with React Router V6 for seamless navigation.
- **Backend Setup**: Uses Express.js to handle API endpoints, async operations, error handling, and password hashing.
- **Database**: MongoDB is used as the database to store application data.
- **Frontend-Backend Communication**: Connects frontend to backend using Axios for RESTful API communication.
- **Express Async Handler**: Utilizes the "express-async-handler" package for cleaner error handling in asynchronous operations.
- **Password Hashing**: Securely hashes passwords before storing them in the database.

### Setup

1. **Backend Setup**:
   - Clone the repository.
   - Navigate to the backend directory and run `npm install` to install dependencies.
   - Configure MongoDB connection in `.env` file.
   - Run `npm start` to start the Express server.

2. **Frontend Setup**:
   - Navigate to the frontend directory and run `npm install` to install dependencies.
   - Update backend API URL in `.env` file if necessary.
   - Run `npm start` to start the React development server.

### Folder Structure

- **backend**: Contains Express.js server files.
- **frontend**: Contains React.js frontend files.
- **public**: Public assets for the frontend.
- **src**: Source code for both backend and frontend.

### Usage

- Access the application through the provided frontend URL.
- Register/login to access the dashboard for product management.
- Manage user profile and contact us through respective pages.

### Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- JSON Web Token (JWT)
- Redux Toolkit
- Axios
- React Router V6
- SCSS



![dashbotdpng](https://github.com/markk300/DashBoard/assets/107115757/524a5ea5-0bd0-47a7-828d-be49a8d95d29)

![dashbotdpngreg](https://github.com/markk300/DashBoard/assets/107115757/500b6501-2d80-41f5-9f8d-8c4dae81fbe8)

![dashbotdpngreg3](https://github.com/markk300/DashBoard/assets/107115757/42aa8f9c-0fcb-48c1-9fb7-9d1c920b34d9)


