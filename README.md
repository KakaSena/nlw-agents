# 🧠 NLW Agents

NLW Agents is a full-stack AI-powered application that transcribes audio and lets users ask smart questions about it. It uses Google Gemini for transcription, embeddings, and contextual answers based on your recordings.

## 🛠️ Tech Stack

**Backend**
- Fastify
- TypeScript
- Drizzle ORM
- PostgreSQL + pgvector
- Google Gemini API

**Frontend**
- React
- Next.js
- Tailwind CSS
- shadcn/ui

**Dev Tools**
- Vite
- ESLint + Prettier
- Docker (optional)
- Vercel (optional for frontend deployment)

## 📦 Installation

Follow the steps below to get the project up and running:

### 🌱 Environment Variables

Create a `.env` file based on `.env.example`:

```env
GEMINI_API_KEY=your_google_gemini_key
DATABASE_URL=postgres://username:password@localhost:5432/database_name
```

```bash
# Clone the repository
git clone https://github.com/KakaSena/nlw-agents.git
cd nlw-agents
```

### 🖥 Project Structure

- `server/`: Backend (API, database, AI services)
- `web/`: Frontend (user interface)

### ⚙️ Setup Backend

```bash
cd server

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run database migrations and seed
npm run db:migrate
npm run db:seed

# Start backend server
npm run dev
```

### 💻 Setup Frontend

In a new terminal:

```bash
cd web

# Install frontend dependencies
npm install

# Start frontend dev server
npm run dev
```

Make sure **both** `server` and `web` are running at the same time for full functionality.

---

## 👨‍💻 Author

Developed by [@KakaSena](https://github.com/KakaSena) during **NLW** by Rocketseat 💜


