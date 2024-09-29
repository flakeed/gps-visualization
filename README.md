# GPS Measurement Visualization
**Status**: *Done*

## Project Overview
This project implements a web-based visualization system for GPS measurements. It connects to a GPS emulation service via WebSocket, processes the received data in real-time, and displays the positions of an object and satellites on a Cartesian coordinate graph.

## Features
- **Real-time Data Visualization**:
  - Displays the position of an object and multiple satellites on a Cartesian coordinate graph.
  - Updates in real-time as new data is received.

- **WebSocket Communication**:
  - Establishes a WebSocket connection to the GPS emulation service.
  - Processes incoming GPS measurement data.

- **GPS Configuration**:
  - Allows adjustment of GPS parameters such as satellite and object speed through a user interface.
  - Sends configuration updates to the GPS emulation service via API.

## How to Run

### 1. Setting up the GPS Emulation Service
```bash
docker pull iperekrestov/university:gps-emulation-service
docker run --name gps-emulator -p 4001:4000 iperekrestov/university:gps-emulation-service
```

### 2. Setting up the Web Application
```bash
# Install the dependencies 
npm install

# Start live-server and select the public folder
npm start
# Or
live-server
```