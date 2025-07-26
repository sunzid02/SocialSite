# Dev Connector App

## Project Overview

Dev Connector is a social networking platform designed specifically for developers. It allows users to create profiles, share experiences, post content, and interact with other developers. The app is built using React for the frontend and Node.js with Express for the backend.

## Features

- User authentication and registration
- Developer profiles with experience, education, and skills
- Social features including posts, likes, and comments
- Dashboard for managing user profile and posts

## Technology Stack

### Frontend

- React
- Redux
- Axios
- Bootstrap

### Backend

- Node.js
- Express
- MongoDB
- JWT Authentication
- Passport.js

## Directory Structure

### Frontend

frontend/
├── public/
│ ├── index.html
│ ├── favicon.ico
│ └── manifest.json
├── src/
│ ├── actions/
│ ├── components/
│ ├── reducers/
│ ├── App.js
│ ├── index.js
│ └── store.js
├── package.json
└── README.md

shell
Copy

### Backend

backend/
├── config/
│ ├── keys.js
│ ├── passport.js
│ └── production.json
├── models/
│ ├── Post.js
│ ├── Profile.js
│ └── User.js
├── routes/
│ └── api/
│ ├── posts.js
│ ├── profile.js
│ └── users.js
├── validation/
├── server.js
├── package.json
└── package-lock.json

perl
Copy

## Getting Started

### Prerequisites

Ensure you have installed:

- Node.js and npm
- MongoDB

### Installation and Setup

#### Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure MongoDB URI in `config/keys.js`:
    ```javascript
    module.exports = {
        mongoURI: 'your_mongodb_connection_string',
        secretOrKey: 'your_jwt_secret'
    };
    ```
4. Start the backend server:
    ```bash
    npm run server
    ```

#### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the React development server:
    ```bash
    npm start
    ```

## Usage

After both the frontend and backend servers are running, navigate to `http://localhost:3000` in your browser to use the Dev Connector application.

## Deployment

- For frontend deployment, you can use platforms like Netlify or GitHub Pages.
- Backend deployment can be done using platforms like Heroku or AWS.

## Tutorial Acknowledgment

This project was created by watching the **Advanced Frontend Development and Deployment** course on [Coursera](https://www.coursera.org/learn/packt-advanced-frontend-development-and-deployment-l9mi4). I would like to thank the instructor for providing this insightful and practical tutorial that guided me in building this app. The tutorial covered essential concepts and techniques, and it helped me implement the project with confidence.

## Contributing

Feel free to fork the repository and submit pull requests. Contributions, issues, and feature requests are welcome.

## License

This project is licensed under the MIT License.