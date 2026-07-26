# TaskFlow — Client (Frontend)

React frontend for **TaskFlow**, a MERN Project & Task Management platform built for the **Codveda Technologies Full-Stack Development Internship**.

> Backend repo: [New-project-server](https://github.com/Siam24857/New-project-server)

---

## 🧱 Tech Stack

- **React 18** + **Vite** — UI library & build tool
- **React Router v6** — client-side routing
- **Tailwind CSS** — utility-first styling
- **Axios** — HTTP client
- **Context API** — state management (auth, sockets)

## 📁 Folder Structure

```
client/
├── src/
│   ├── api/         # Axios instance & API service modules
│   ├── components/  # Reusable UI components
│   ├── context/     # React Context providers (state)
│   ├── hooks/       # Custom hooks
│   ├── pages/       # Route-level pages
│   ├── routes/      # Protected & role-based routes
│   ├── utils/       # Helpers
│   ├── App.jsx      # Root component / routes
│   └── main.jsx     # Entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy `.env.example` to `.env` (defaults work for local dev):
```bash
cp .env.example .env
```
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | API base URL. Use `/api` to leverage the Vite dev proxy. |

### 3. Run the dev server
```bash
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build
```

> The Vite dev server proxies `/api` → `http://localhost:5000`, so run the backend too.

## 🗺️ Milestones

- [x] **M1** — Dev environment + backend connectivity check
- [x] **M3** — Responsive UI + dynamic data
- [x] **M4** — React components, hooks, reusable UI, loading states
- [ ] **M5** — Auth pages + protected routes (JWT)
- [ ] **M7** — Role-based dashboards
- [ ] **M8** — Real-time UI (Socket.io)
- [ ] **M9** — GraphQL

## 📄 License

MIT © Siam
