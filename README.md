# 🧾 BizFlow — Check & Sales Management System

**BizFlow** is a modern desktop and web application for managing **checks, sales, and financial transactions**, built with **React, TypeScript, Vite, and Electron**.  
It provides an intuitive and efficient interface for recording, analyzing, and tracking financial operations.

---

## 🚀 Key Features

- 📅 **Check Management:** Create, edit, and track received or issued checks.
- 💰 **Sales Management:** Manage invoices and sales history effortlessly.
- 📊 **Analytical Dashboard:** Visual overview of profits, revenue, and expenses.
- ⚡ **Modern UI:** Built using React + Vite for optimal performance.
- 💼 **Portable Desktop App:** Electron-based, runs without installation.
- 🔔 **Alerts & Notifications:** Automatic reminders for check due dates.
- 🧠 **Local Data Storage:** Securely stored in IndexedDB or SQLite.

---

## 🏗️ Project Architecture

```
BizFlow/
│
├── electron.js              # Electron entry file for desktop version
├── index.html               # Main HTML entry point
├── package.json             # Dependencies & scripts
├── vite.config.ts           # Vite build configuration
├── src/
│   ├── App.tsx              # Root React component
│   ├── db.ts                # Local database management
│   ├── components/          # Reusable UI components
│   │   ├── checks/          # Check management (forms, tables, lists)
│   │   └── sales/           # Sales management modules
│   ├── pages/               # Core pages (Dashboard, Checks, Sales)
│   ├── utils/               # Helper functions (dates, timers, etc.)
│   └── styles/              # Global styles
└── public/                  # Static assets
```

---

## ⚙️ Installation & Setup

### 1. Requirements
- Node.js ≥ 18  
- npm or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Run in Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### 4. Build Electron Distribution
To build a portable desktop version:
```bash
npm run dist
```
Executable files will be generated in the `dist/` folder.

---

## 🖥️ Main Pages

| Page | Description |
|------|--------------|
| **Dashboard** | Overview of financial summary, sales, and checks |
| **Checks** | Manage received/issued checks with filters and editing |
| **Sales** | Record and view sales invoices |
| **Alerts** | Notifications for upcoming check due dates |

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| UI | React + TypeScript + Tailwind |
| Build | Vite |
| Desktop | Electron |
| Storage | IndexedDB / SQLite |
| Logic Layer | Custom Hooks + Context API |

---

## 🛠️ Useful Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build web version |
| `npm run dist` | Build Electron desktop app |
| `npm run lint` | Lint source code |

---

## 🔐 Privacy & Security

- All user data is stored **locally** on the device.  
- **No external servers** are required for the desktop version.  
- Sensitive data is **encrypted** in the local database.

---

## 👥 Authors

Developed by the **BizFlow Team**, focused on simplifying financial and check management for small and medium-sized businesses.

---

## 📄 License

Released under the **MIT License**.  
You are free to use, modify, and distribute this software.

---
