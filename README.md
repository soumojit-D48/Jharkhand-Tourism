# Project Name

## Overview
Brief description of project.

---

## 🛠️ Tech Stack

### 🌐 Frontend (Client)
- **React** (with Vite as build tool) 
- **Tailwind CSS** – Utility-first CSS framework for styling
- **shadcn/ui** – Pre-built, accessible React components

### ⚙️ Backend (Server)
- **Node.js** with **Express.js** Server-side runtime & web framework
- **MongoDB** with **Mongoose** – Database & ODM

### 🔌 APIs & Libraries
- **Weather API** – Real-time weather data
- **Leaflet.js** – JavaScript library for interactive maps & routing
- **Google Gemini API** – AI-powered chatbot & Q&A assistant

---

## 📂 Project Structure
```
    project-root/
│── client/ (Frontend)
│── server/ (Backend)
│── README.md

```

# 🛠️ How to Install Node.js and npm

This guide explains how to install Node.js and npm on your computer step by step.

---

## 1️⃣ Check if Node.js is already installed

Open your terminal (Command Prompt, PowerShell) and type:

```bash
node -v
npm -v

If both commands show version numbers (e.g., v20.5.1 for Node and 9.8.0 for npm), you are ready.

If you get an error, continue with installation -->
Step

```

## 2️⃣ Download Node.js

- Open the official Node.js website: [nodejs.org](https://nodejs.org/en)

- click Get Node.js

- You will see two options:

- LTS (Long Term Support) → Recommended for most users (stable version)

- Click the LTS button to download the installer for your operating system.

-  get a prebuilt Node.js® for Windows running an x64 architecture.

- click on Windows Installer

- Run the installer and follow the on-screen instructions. Then follow step 3 ->


## 3️⃣ Run the Installer

- Open the downloaded installer file.

- Follow the setup steps:

- Accept the license agreement

- Choose the installation location (default is fine)

- Make sure “Add to PATH” is checked [✓] Add to PATH

- Click "Install" and wait for it to finish


## 4️⃣ Verify Installation

- After installation, open a new terminal window and check versions:

```bash
node -v
npm -v


- if it shows 
v22.14.0   # Node.js version
11.3.0     # npm version

Then OK

```

---

# How to Run the code in locale machine

## 1️⃣ check everything is fine or not:

- Open terminal and run:

```bash

#Open terminal
C:\Users\YourUsername> 

# check if git is installed or not:
git --version
# Example output:
git version 2.49.0.windows.1

# If git is not installed, download and install it from https://git-scm.com/downloads

git config --list
# Example output: (at the bottom)
user.name=Your Name
user.email=You Email

# If user.name and user.email are not set, configure them:
git config --global user.name "Your Name"
git config --global user.email "Your Email"

Then check again:
git config --list

The eamil and name should be same as your GitHub account email and name.**

# Check Node.js and npm versions:
node -v
# Example output:
v22.14.0

npm -v
# Example output:
11.3.0

```

## 2️⃣ Clone the Repository 

```bash
# Go to the folder where you want to store the project
cd C:\Users\YourUsername\Documents

# Or create a new folder in desktop and open it in vs code terminal
cd C:\Users\YourUsername\Desktop\NewFolder

# Clone the repository 
-> paste the command below into that folder where you want to store \NewFolder, and press Enter

git clone https://github.com/username/repo.git

#Example:
C:\.......\Desktop\NewFolder> git clone https://github.com/soumojit-D48/Jharkhand-Tourism.git


# Move into the project folder

-> Now You are C:\.......\Desktop\NewFolder>

run 
cd Jharkhand-Tourism
-> now You are C:\.......\Desktop\NewFolder\Jharkhand-Tourism>

```

## 3️⃣ Install Dependencies then Run the Project

```bash
# Set Up Environment Variables

-> Create a .env file in client folder also in server folder.
1. cd client
carete a folder called .env , by double click(right click) on client folder

2. cd server
carete a folder called .env , by double click(right click) on server folder

#Go inside client and install dependencies and run these two one by one:
cd client
-> You must here \client> then run next two,
npm install
npm run dev

#Now Open a new terminal with the + icon in vs code embeded terminal

#Open a new terminal -> go inside server and install dependencies and run these two one by one:
cd server
-> You must here \server> then run next two,
npm install
npm run dev

#All done just the two terminals not gave any error

1. in \server> terminal You will see, but dont do anything here just check there is no error
Server is running on 3000 
MongoDB connected!!


2. in \client> terminal there will be a link
http://localhost:5173
paste it in your browser and see the website


```

