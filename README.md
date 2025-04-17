# Task Hive 🐝

A full-stack web application designed for managing tasks using an interactive Kanban board interface. Task Hive allows users to create, update, move, and delete tasks across different stages (Backlog, Pending, To Do, Doing, Done).

<div align="center">
  <a href="https://www.marwan-boudiab.com/projects/task-hive#demo">
    <img src="https://crrwymojtb.ufs.sh/f/0ge4q9E4PJeZa9eQbCnoEhtMidny7gKNFS509VXz8UIqH3GT" alt="Task Hive Demo" width="600" style="border-radius: 12px;">
    <br>
    <p><strong>▶️ Click to watch project demo</strong></p>
  </a>
</div>

## 🚀 Features

### User Experience
- **Visual Kanban Board**: Interactive task management with distinct columns (Backlog, Pending, To Do, Doing, Done)
- **Drag & Drop Functionality**: Easily move tasks between different status columns
- **Task Cards**: Visual representation of tasks with key information at a glance
- **Real-time Updates**: Board reflects changes made to tasks immediately

### Task Management
- **Complete CRUD Operations**:
  - Create tasks with detailed information
  - View task details on interactive cards
  - Edit existing task details
  - Delete tasks when completed or no longer needed
- **Rich Task Details**:
  - Title and description
  - Priority level indicators
  - Assignee information
  - Deadline tracking (in minutes)
  - Custom tags
  - Image attachments

### Security & Authentication
- **User Authentication**: Secure login system
- **JWT Implementation**: JSON Web Tokens for stateless authentication
- **Password Security**: Secure hashing with bcrypt
- **Protected Routes**: Authorization checks for sensitive operations

### Technical Capabilities
- **Image Upload System**: Attach and store images with Firebase Storage
- **Responsive Design**: Optimized for various screen sizes
- **Clean UI**: Intuitive interface built with modern web technologies
- **Data Persistence**: MongoDB integration for reliable data storage

## 🛠️ Technology Stack

- **Frontend**:
  - React with TypeScript
  - Vite (Build Tool)
  - TailwindCSS for styling
  - React Router DOM for routing
  - React Beautiful DnD for drag & drop
  - Lucide React / React Icons
  - Firebase Client SDK

- **Backend**:
  - Node.js with Express.js
  - MongoDB with Mongoose ODM
  - JWT for authentication
  - Bcrypt for password security
  - Multer for file handling
  - CORS for cross-origin requests

- **Storage & Deployment**:
  - Firebase Storage for images
  - Environment variable management with dotenv

## 📦 Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- MongoDB instance (local or cloud)
- Firebase project with Storage enabled

### Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd task-hive
   ```

2. Setup Backend
   ```bash
   cd backend
   npm install

   # Create .env file with:
   # PORT=4000
   # MONGO_URI=<your_mongodb_connection_string>
   # SECRET=<your_jwt_secret_key>

   npm run dev
   ```

3. Setup Frontend
   ```bash
   cd ../client
   npm install

   # Create .env file with Firebase config
   # VITE_API_URL=http://localhost:4000
   # REACT_APP_FIREBASE_API_KEY=<your_firebase_api_key>
   # (plus other Firebase environment variables)

   npm run dev
   ```

4. Access the application at the URL provided by Vite (typically http://localhost:5173)

## 🔧 Environment Configuration

### Backend Variables
| Variable    | Description                         |
|-------------|-------------------------------------|
| PORT        | Server port (default: 4000)         |
| MONGO_URI   | MongoDB connection string           |
| SECRET      | JWT secret key                      |

### Frontend Variables
| Variable                            | Description                    |
|-------------------------------------|--------------------------------|
| VITE_API_URL                   | Backend API URL                |
| REACT_APP_FIREBASE_API_KEY          | Firebase API Key               |
| REACT_APP_FIREBASE_AUTH_DOMAIN      | Firebase Auth Domain           |
| REACT_APP_FIREBASE_PROJECT_ID       | Firebase Project ID            |
| REACT_APP_FIREBASE_STORAGE_BUCKET   | Firebase Storage Bucket        |
| REACT_APP_FIREBASE_MESSAGING_SENDER_ID | Firebase Messaging ID       |
| REACT_APP_FIREBASE_APP_ID           | Firebase App ID                |

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

This project uses various open-source libraries and tools:
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)
- [Firebase](https://firebase.google.com/)
- [And many more...](#)

# Login
manager@gmail.com
Manager@1#enc