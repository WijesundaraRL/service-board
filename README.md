# Service Request Board

A full-stack web application where homeowners can post service requests and tradespeople can browse, update, and manage them.

Built with Next.js, Node.js,  Express, and MongoDB.


## Tech Stack

Frontend: Next.js 15 (App Router), Tailwind CSS
Backend:  Node.js, Express
Database: MongoDB Atlas, Mongoose
Auth: JWT



## Project Structure

frontend - Next.js app (runs on port 3000)
backend - Express API (runs on port 5000)

Environment Variables - 

Backend (backend/.env)
PORT=5000
MONGO_URI=mongodb_connection_string_
JWT_SECRET=jwt_secret_key

Frontend (frontend/.env.local)

NEXT_PUBLIC_API_URL=http://localhost:5000


Setup and Run Instructions:
Backend Setup -

cd backend
npm install
npm run dev


Frontend Setup -


cd frontend
npm install
npm run dev


Seed the Database -

cd backend
npm run seed

