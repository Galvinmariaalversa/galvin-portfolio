# Modern Developer Portfolio & SaaS Starter

A premium, high-performance developer portfolio and SaaS starter site built using **Next.js 16 (React 19)**, **Tailwind CSS v4**, and **Nodemailer** for contact form notifications.

## 🚀 Features

- **Dynamic Interactive UI**: Smooth micro-animations, particle canvas transitions (`ParticleCanvas.tsx`), and custom preloading sequences.
- **Scroll reveal effects**: Page elements reveal smoothly on scroll (`ScrollReveal.tsx`).
- **Functional Contact Form**: Direct message delivery powered by **Nodemailer** API routing.
- **Admin Inquiries Dashboard**: Secure admin area to manage contact messages (`app/admin` and JWT authentication).
- **Responsive Layout**: Designed for mobile, tablet, and desktop views.
- **SEO Optimized**: Fully structured tags and metadata.

## 🛠️ Tech Stack

- **Core Framework**: [Next.js](https://nextjs.org/) (App Router & React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Mailing**: [Nodemailer](https://nodemailer.com/)
- **State & Animations**: Vanilla CSS Transitions, React Hooks

---

## 💻 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18.x or higher recommended).

### 2. Installation
Clone your repository and install the dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add the following variables for the contact form and admin JWT token:

```env
# Email Settings for Nodemailer
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

# Admin Auth Settings
JWT_SECRET=your-secure-jwt-secret-key
ADMIN_PASSWORD=your-secure-admin-password
```

### 4. Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production
To build the application for deployment:
```bash
npm run build
```

---

## 🌐 Deployment

### Vercel (Recommended)
The easiest way to deploy this Next.js app is using the **Vercel Platform**:

1. Push your code to a private GitHub repository.
2. Import the repository into **[Vercel](https://vercel.com/)**.
3. Under project settings, add the environment variables defined in your `.env.local` file.
4. Click **Deploy**.

---

## 🔒 License
This project is licensed under the MIT License.
