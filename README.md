# 📝 Scribbly | Think it. Note it. Find it.

**Scribbly** is a generic note-taking application that allows users to create, manage, and search notes efficiently.  
This project was developed as part of the **Junior Software Developer Bootcamp - Cohort 9**.

## 🚀 Features

- **CRUD Operations** – Create, read, update, and delete notes.
- **User Authentication** – Secure user access using JWT-based authentication.
- **Search Functionality** – Quickly search through notes.
- **Tag Filtering** – Filter notes by assigned tags.
- **Shortcut Filtering** – Access frequently used or marked notes easily.

## 🛠️ Technologies Used

### Language & Frameworks
- **TypeScript**, **JavaScript**
- **Frontend**: [React](https://react.dev/), [Shadcn UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), Vite
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)

### Database & ORM
- [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/)

### Security
- [Helmet.js](https://helmetjs.github.io/), CORS, Rate Limiting
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js), [JWT](https://jwt.io/), Secure Cookies

### Environment Management
- `dotenv`

### Deployment
- [Vercel](https://vercel.com/)

## 🌐 Deployment

Scribbly is deployed on the following platforms:
- **Frontend** – Deployed via [Vercel](https://vercel.com/)
  - 🔗 [Live Frontend App](https://jsd9-mini-project-scribbly.vercel.app/)
- **Backend** – Deployed via [Render](https://render.com/)
  - 🔗 [Live Backend API](https://jsd9-mini-project-scribbly-backend.onrender.com)

## 💻 Installation (Local Development)
1. **Clone both frontend and backend repositories**
   ```bash
   git clone https://github.com/taemmyk/jsd9-mini-project-scribbly-frontend.git
   git clone https://github.com/taemmyk/jsd9-mini-project-scribbly-backend.git
   ```
2. **Install dependencies**
   - Frontend
   ```bash
   cd ../scribbly-frontend
   npm install
   ```
   - Backend
   ```bash
   cd ../scribbly-backend
   npm install
   ```
3. **Set up environment variables**
   - Copy .env.example to .env in the *backend* folder and configure values accordingly.
   ```bash
   cp .env.example .env
   ```
4. **Run the app locally**
   - Frontend
   ```bash
   cd scribbly-frontend
    npm run dev
   ```
   - Backend
   ```bash
   cd scribbly-backend
    npm run dev
   ```