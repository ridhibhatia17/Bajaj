# Hierarchy Analyzer - Chitkara Full Stack Engineering Challenge

![Hierarchy Analyzer Banner](./frontend/public/vite.svg) <!-- Replace with a nice project banner screenshot -->

## 🚀 Project Overview

The **Hierarchy Analyzer** is a robust full-stack web application engineered for the Chitkara Full Stack Challenge. It parses, validates, and structurally visualizes relational edge data (e.g., `A->B`). The system features a highly optimized backend mathematical engine capable of building deeply nested hierarchical trees, resolving diamond architectures, and detecting cyclic graphs natively using depth-first search logic. The frontend boasts a stunning, responsive **Glassmorphism** user interface built with React and Tailwind CSS.

---

## ✨ Features

- **Algorithmic Hierarchy Builder:** Processes unstructured relational edges into deeply nested JSON tree structures instantly.
- **Smart Validation Engine:** Automatically scrubs invalid formats, trims whitespaces, and guarantees strict input integrity.
- **Duplicate & Diamond Resolvers:** Filters out duplicate edges and enforces strict single-parent tree structures.
- **DFS Cycle Detection:** Implements highly optimized Depth-First Search (DFS) to locate isolated or interconnected graph cycles natively without crashing.
- **Premium User Interface:** Beautiful "Glassmorphism" design system featuring frosted cards, glowing micro-animations, and dynamic gradient layouts.
- **Live Tree Visualizer:** A custom recursive React component for visually collapsing/expanding JSON branches with smooth structural CSS transitions.

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS (Utility-First styling & Keyframe Animations)
- Axios

**Backend**
- Node.js
- Express.js
- CORS & Dotenv

**Deployment Architecture**
- **Frontend:** Vercel (SPA configuration included via `vercel.json`)
- **Backend:** Render (Serverless Web Service configuration via `render.yaml`)

---

## 🏗️ Architecture

The project operates under a strict separation of concerns, decoupling logic into isolated functional micro-services.

- **`validation.service.js`**: Sanitizes incoming string arrays against Regex.
- **`duplicate.service.js`**: Deduplicates `Set` iterations to save computational overhead.
- **`diamond.util.js`**: Actively prevents multi-parent hierarchy collisions.
- **`hierarchy.service.js`**: Assembles the topological adjacency list and builds the recursive nested JSON.
- **`cycle.util.js`**: Traces execution paths to flag infinite loops prior to recursive tree rendering.
- **`summary.service.js`**: Segregates the entire graph into independent Weakly Connected Components (WCCs) to compute accurate aggregate summaries.

---

## 📚 API Documentation

### `POST /bfhl`

Processes an array of relational edge strings and calculates topological graphs and insights.

**Request Body:**
```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

**Response Payload:**
```json
{
  "is_success": true,
  "user_id": "ridhibhatia_ddmmyyyy",
  "email_id": "your_college_email@xyz.com",
  "college_roll_number": "YOUR_ROLL_NUMBER",
  "hierarchies": {
    "tree": {
      "A": {
        "B": {
          "D": {}
        },
        "C": {}
      }
    },
    "depth": 3,
    "has_cycle": false
  },
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}
```

---

## 💻 Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Local Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/repo-name.git
   cd repo-name
   ```

2. **Start the Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   *(Server natively starts on http://localhost:5000)*

3. **Start the Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *(Vite natively starts on http://localhost:5173)*

---

## 🌐 Deployment

The application is pre-configured with continuous deployment configurations.

1. **Frontend (Vercel)**
   - Connect Vercel to your GitHub repo.
   - Point the build directory to the `frontend` folder.
   - Set environment variable: `VITE_API_URL=<your-render-url>/bfhl`.
   - Vercel automatically respects the internal `vercel.json` rewrite file.
   
2. **Backend (Render)**
   - Connect Render via Blueprint deployment.
   - Render will automatically locate the `render.yaml` file, construct the web service, and provision dependencies automatically.

---

## 📸 Screenshots

*(Remember to replace these with actual deployed screenshots prior to submission!)*

### Dashboard & Analytics Overview
> ![Dashboard Screenshot](./assets/dashboard_placeholder.png)

### Recursive Flow & API Error Handling
> ![Tree Visualizer](./assets/visualizer_placeholder.png)

---

## 📂 Folder Structure

```text
bajaj/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── bfhl.controller.js
│   │   ├── routes/
│   │   │   └── bfhl.route.js
│   │   ├── services/
│   │   │   ├── duplicate.service.js
│   │   │   ├── hierarchy.service.js
│   │   │   ├── summary.service.js
│   │   │   └── validation.service.js
│   │   ├── utils/
│   │   │   ├── cycle.util.js
│   │   │   ├── depth.util.js
│   │   │   └── diamond.util.js
│   │   └── app.js
│   ├── server.js
│   ├── render.yaml
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputForm.jsx
│   │   │   ├── ResponseDisplay.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   └── TreeComponent.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── index.css
│   ├── vercel.json
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```
