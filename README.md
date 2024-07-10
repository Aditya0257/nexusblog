# Nexus

Nexus is a blogging application that allows users to create and read blogs. The app features a responsive UI built with Tailwind CSS, and uses a combination of advanced technologies for a robust and scalable experience.

## Tech Stack

- **Backend Framework:** Hono.js - A lightweight and high-performance web framework for Cloudflare Workers.
- **Deployment:** Cloudflare Workers - Serverless computing platform for deploying backend code.
- **Frontend Framework:** Vite + React - A fast build tool and library for building user interfaces.
- **State Management:** Recoil - A state management library for React applications.
- **UI Framework:** Tailwind CSS - A utility-first CSS framework for designing responsive user interfaces.
- **Schema Validation:** Zod - A TypeScript-first schema declaration and validation library.
- **Deployment for Frontend:** Vercel - Platform for deploying frontend applications.

## Features

- **Create Blogs:** Users can write and publish their own blogs.
- **Read Blogs:** Users can explore and read blogs created by others.
- **Responsive Design:** A mobile-friendly UI built with Tailwind CSS.
- **User State Management:** Efficient state management with Recoil.
- **Schema Validation:** Shared Zod schemas for both frontend and backend validation.

## Getting Started

### Prerequisites

- Node.js (version 18 or above)
- npm (comes with Node.js)
- Cloudflare Workers Account (for backend deployment)
- Vercel Account (for frontend deployment)

### Installation

1.  **Clone the repository:**

    git clone <https://github.com/your-username/nexus.git> cd nexus

2.  **Install dependencies for both frontend and backend:**

    npm install

### Running Locally

1.  **Start the development server:**

    npm run dev

### Deploying

1.  **Deploy the backend to Cloudflare Workers:**

    npm run deploy

2.  **Deploy the frontend to Vercel:**

    You can deploy the frontend by connecting your Vercel account to your GitHub repository and setting up automatic deployments.

### Common Commands

- **Start Development Server:** npm run dev
- **Deploy Backend:** npm run deploy

### Zod Schemas

The Zod schemas used in the application are available in the `common` folder and are shared between the frontend and backend. The Zod package is published to npm and imported into both the frontend and backend projects.

### Contributing

We welcome contributions to Nexus! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or fix.
3.  Make your changes.
4.  Open a pull request with a description of your changes.
