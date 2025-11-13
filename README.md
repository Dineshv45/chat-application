Real-Time Chat Application
Built with React (Vite) + Socket.io + Node.js + Express

A lightweight, fast, and responsive real-time chat application with multi-room support.
Users can join chat rooms, see online members, and message instantly — all powered by WebSockets.

Features
✔ Real-time messaging (Socket.io)
✔ Many chat rooms supported (each user joins one room at a time)
✔ Online users panel (animated slide-in)
✔ Clean and responsive UI
✔ Instant join & leave notifications
✔ Deployed frontend on Vercel
✔ Deployed backend on Render

📂 Project Structure
/frontend
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── App.jsx
  │   └── main.jsx
  ├── .env
  └── vite.config.js

/backend
  ├── index.js
  ├── router.js
  ├── users.js
  ├── package.json
  ├── .env
  └── README.md

  1️⃣ Clone the repository
  ```
git clone https://github.com/Dineshv45/chat-application
cd chat-application
```
🖥️ Frontend Setup (React)
```
cd frontend
npm install
```
Create .env file
```
npm run dev
```

🔌 Backend Setup (Node + Socket.io)
```
cd backend
npm install
```

Start locally
```
npm start
```

🌍 Deployment
Frontend → Vercel

Push frontend folder to GitHub
Import repo to Vercel
Add environment variables:

```
VITE_BACKEND_PROD=https://your-backend.onrender.com
```

4. Add vercel.json to fix refresh routing:
{
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

}

Backend → Render
1) Create new Web Service
2) Connect backend folder
3) Build command

   ```
   npm install
   node index.js
   
   ```

5) Add environment variables (optional)
6 )Deploy

   ⚠️ Important
Update your backend CORS to allow Vercel domain:
```

cors: {
  origin: "https://your-frontend.vercel.app",
  methods: ["GET", "POST"],
  credentials: true,
}

```
🔗 Environment-Based Endpoint Selection
```
const ENDPOINT =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BACKEND_LOCAL
    : import.meta.env.VITE_BACKEND_PROD;
```

🖼️Join Screen
📷 Screenshots<img width="1348" height="619" alt="Screenshot 2025-11-13 171540" src="https://github.com/user-attachments/assets/036c5019-dd1f-4114-85eb-ed54792da8d4" />

🗨️ Chat UI
<img width="1354" height="627" alt="Screenshot 2025-11-13 171939" src="https://github.com/user-attachments/assets/d8fd28ce-7859-414d-b89d-5750f58ac00e" />

👥 Online Users Panel
<img width="1356" height="631" alt="Screenshot 2025-11-13 172349" src="https://github.com/user-attachments/assets/06b5dd66-59b5-4ed4-8d23-b5ff18cf3c6e" />


⚙️ How It Works (Short Explanation)

On joining, frontend sends socket.emit("join")
Server adds user and joins a Socket.io room
Server broadcasts join/leave messages
Messages are emitted in real-time using:

