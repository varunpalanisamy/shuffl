# Shuffl

## Prerequisites
- The main aspect of this app is that it shuffles all the cards and gives the users two cards each
- App that takes out the need for physical poker hands (cards)
- There will be the same features just like in real life (call, fold, check)
- This will also allow users to learn while they are playing
  
# Project Setup Instructions

This README provides step-by-step instructions to set up and run the project.

## Prerequisites

Before running the project, ensure you have the following installed:

1. **Python** (version 3.x)
2. **Node.js** (version 18.x)
3. **npm** (comes with Node.js installation)
4. **FastAPI** and other Python dependencies (via `requirements.txt`)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd shuffl
```

### 2. Install Python dependencies

Make sure you are in the project root directory and run:

```bash
pip install -r requirements.txt
```

### 3. Install Node.js dependencies

Ensure you have Node.js 18 installed. If not, install it from [Node.js official site](https://nodejs.org/).

To install the project dependencies, run:

```bash
cd frontend
npm install
```

### 4. Running the backend

In the project root directory, start the backend server by running:

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

- This will start the FastAPI backend on `http://0.0.0.0:8000`.
- To test if the backend is running correctly, open `http://127.0.0.1:8000/deal` in your browser and ensure JSON data is returned.

### 5. Running the frontend

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
npm start
```

- This will start the React Native frontend.
- If using Expo Go, scan the QR code shown in the terminal to run the app on your mobile device.

### 6. Troubleshooting

- If you encounter issues related to missing dependencies, ensure all required dependencies have been installed correctly.
- Check that the backend is running and accessible via the correct IP address if running on a mobile device.

---

## Python Dependencies (requirements.txt)

Create a `requirements.txt` file and add the following dependencies:

```
fastapi
uvicorn
python-multipart
```

To install the dependencies, run:

```bash
pip install -r requirements.txt
```

---

## Useful Commands

### Stop backend server
Press `CTRL + C` in the terminal running the backend to stop it.

### Clean npm cache
```bash
npm cache clean --force
```

### Reinstall frontend dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Additional Notes

- Ensure your firewall allows traffic on port 8000 if accessing the backend from another device.
- If running on a local network, update the frontend to fetch data from the correct backend IP (e.g., `http://<your-ip>:8000/deal`).

---

That's it! Your project should now be up and running successfully.

