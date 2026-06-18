# CareerForge AI 🚀

An advanced, AI-powered career platform designed to help you build the perfect resume, analyze your ATS compatibility, and land your dream job with confidence. 

## 🌟 Features

### 📄 Advanced Resume Builder
- **Dynamic Template Gallery**: Choose from 4 meticulously crafted base layouts (Modern, Classic, Minimal, Professional).
- **100+ ATS-Friendly Variations**: Mix and match layouts with 5 premium color themes and 5 typography styles for over 100 unique, ATS-optimized combinations.
- **Drag-and-Drop Reordering**: Easily reorder sections to highlight your strongest qualifications.
- **Live Miniature Previews**: See exactly what your resume looks like in real-time as you select templates from the gallery.
- **Comprehensive Sections**: Add everything from Personal Info, Experience, and Education to Projects, Skills, Certifications, and Languages.
- **PDF Export**: One-click, high-quality PDF export retaining 100% text-selectability for Applicant Tracking Systems.

### 🔍 ATS Score Checker
- **Job Description Matching**: Paste the job description and let CareerForge AI analyze your resume against it.
- **Keyword Optimization**: Discover which critical keywords you're missing to pass strict HR filters.
- **Actionable Insights**: Get a detailed breakdown of your ATS score and immediate steps to improve it.

### 🤖 AI Enhancements
- **Smart Bullet Points**: Automatically generate or enhance your experience bullet points using AI to highlight impact and metrics.
- **Summary Generator**: Craft a compelling professional summary tailored to your target role in seconds.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI & Radix UI
- **State Management**: Zustand
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: NextAuth.js (v5)
- **Drag and Drop**: `@hello-pangea/dnd`
- **PDF Generation**: `react-to-print`

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm/pnpm installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/satyamgupta77/careerforge-ai.git
   cd careerforge-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add the necessary environment variables:
   ```env
   DATABASE_URL="your-postgresql-url"
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   # Add your AI provider API keys (OpenAI / Google Gemini)
   ```

4. **Database Setup**
   Run the Prisma migrations to set up your database schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💡 Usage Guide

1. Navigate to the **Try Resume Builder** page from the homepage.
2. Select a base template, color theme, and typography style from the **Template Gallery**.
3. Fill in your details on the left-hand editor pane. Your changes will reflect instantly on the right.
4. Drag and drop sections to reorder them as needed.
5. Use the **ATS Checker** by navigating to `/ats-checker` to compare your generated resume against a target job description.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/satyamgupta77/careerforge-ai/issues).

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
