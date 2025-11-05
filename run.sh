#!/bin/bash

echo "Starting Orderly..."

# Kill existing processes
pkill -f "python.*app.py" 2>/dev/null
pkill -f "node.*start" 2>/dev/null

# Start backend
cd backend
python3 app.py &
BACKEND_PID=$!
echo "Backend started (PID: $BACKEND_PID)"

# Wait for backend
sleep 3

# Start frontend
cd ../frontend
npm start &
FRONTEND_PID=$!
echo "Frontend started (PID: $FRONTEND_PID)"

# Wait for frontend
sleep 10

echo "Orderly is running:"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3002"
echo "Press Ctrl+C to stop"

# Wait for interrupt
trap "echo 'Stopping...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait