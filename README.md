# Wayne Lassen – Portfolio

[![Live Site](https://img.shields.io/badge/Live-Site-blue)](https://waynelassen.netlify.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-black)](https://github.com/meanogre/portfolio-react)

A small React site built to demonstrate structure, clarity, and maintainability.

This project intentionally avoids unnecessary complexity. It focuses on:

- Clean routing with nested layouts
- Reusable navigation components
- A minimal CSS design system
- Clear content hierarchy
- Expandability without structural drift

The goal is not visual spectacle. The goal is disciplined implementation.

---

## Tech Stack

- React
- React Router
- Vite
- Plain CSS
- GitHub (version control)
- Netlify (continuous deployment)

---

## Deployment Workflow

1. Develop locally.
2. Commit and push to GitHub.
3. Netlify automatically builds and deploys the latest commit.

Production builds are generated via Vite during Netlify’s build process.

---

## Project Structure

- `Layout` provides the application shell.
- Top-level navigation controls primary sections.
- Nested routes support structured sub-sections.
- Project metadata is separated from rendering logic where appropriate.

---

## Local Development

Install dependencies:

```bash
npm install