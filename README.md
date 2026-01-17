# Jharkhand Tourism

## Overview

Brief description of project.

---

## 🛠️ Tech Stack

### 🌐 Frontend (Client)

- **React** (with Vite as build tool)
- **Tailwind CSS** – Utility-first CSS framework for styling
- **shadcn/ui** – Pre-built, accessible React components

### ⚙️ Backend (Server)

- **Node.js** with **Express.js** – Server-side runtime & web framework
- **MongoDB** with **Mongoose** – Database & ODM

### 🔌 APIs & Libraries

- **Weather API** – Real-time weather data
- **Leaflet.js** – JavaScript library for interactive maps & routing
- **Google Gemini API** – AI-powered chatbot & Q&A assistant

---

## 📂 Project Structure

```
project-root/
│── client/      # Frontend (React)
│── server/      # Backend (Node.js/Express)
│── README.md    # Project Documentation
```

---

## 🚀 How to Run Locally

### 1️⃣ Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** (included with Node.js)
- **Git**

Check versions:

```bash
node -v
npm -v
git --version
```

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/soumojit-D48/Jharkhand-Tourism.git
cd Jharkhand-Tourism
```

### 3️⃣ Install Dependencies & Set Up Environment

You need to set up both the client and server.

#### **Backend (Server)**

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Create a `.env` file and add your environment variables.
3. Install dependencies and start the server:
   ```bash
   npm install
   npm run dev
   ```

#### **Frontend (Client)**

1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Create a `.env` file and add your environment variables.
3. Install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```
4. Open the link shown in the terminal (usually `http://localhost:5173`) in your browser.
