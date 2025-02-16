# ParkNGo

## Description
ParkNGo is an online parking booking and Park & Ride system built using the MERN stack (MongoDB, Express, React, and Node.js). The platform allows users to book parking spaces, manage their bookings, and access transportation services.

## Features
- User authentication (Register/Login)
- Book and manage parking spots
- Search available parking spaces
- View booking history
- Secure payment integration
- Admin dashboard for managing parking spaces and users

## Tech Stack
- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Token (JWT), bcrypt
- **Database:** MongoDB
- **Styling:** Tailwind CSS

## Project Structure
```
ParkNGo/
│── backend/                # Node.js + Express backend
│   ├── controllers/        # Controller functions for routes
│   ├── models/             # Mongoose schemas/models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication middleware
│   ├── config/             # Configuration files (DB connection, etc.)
│   ├── server.js           # Main server entry point
│
│── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── context/        # React Context for state management
│   │   ├── services/       # API service functions
│   │   ├── App.js          # Main app entry point
│   │   ├── index.js        # React root entry
│   ├── public/             # Static files
│   ├── package.json        # Frontend dependencies
│
│── README.md               # Documentation
│── .gitignore              # Git ignore file
│── package.json            # Project dependencies
│── .env                    # Environment variables
```

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- npm or yarn

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the backend root and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```

## Usage
- Open `http://localhost:3000/` in your browser to access the frontend.
- The backend runs on `http://localhost:5000/`.
- Use the register and login pages to create an account and access booking services.

## API Endpoints
| Method | Endpoint           | Description |
|--------|-------------------|-------------|
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login user |
| GET    | /api/bookings      | Fetch all bookings |
| POST   | /api/bookings      | Create a new booking |
| DELETE | /api/bookings/:id  | Delete a booking |

## Contributing
If you’d like to contribute:
1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

## License
This project is licensed under the MIT License.

## Contact
For any inquiries or contributions, feel free to reach out!

