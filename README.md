# obssolution-test

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Lint](https://img.shields.io/badge/lint-passing-brightgreen)
![Test](https://img.shields.io/badge/tests-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)

A front-end React project built with **Vite**, **TypeScript**, **Material UI (MUI)**, and **Redux Toolkit**.  
This project includes modern tooling for code quality (ESLint, Prettier), automated testing (Jest + React Testing Library), and Git hooks (Husky + lint-staged).

---

## 🚀 Features

- ⚡ **Vite** — Fast and modern build tool for React apps.  
- 🧠 **TypeScript** — Type-safe JavaScript development.  
- 🎨 **Material UI (MUI)** — Prebuilt UI components with styling via Emotion.  
- 🔁 **Redux Toolkit** — Simplified and scalable state management.  
- ✅ **Testing** — Configured with Jest, jsdom, and React Testing Library.  
- 🧹 **Linting & Formatting** — ESLint and Prettier integrated with Husky and lint-staged.  

---

## 📦 Tech Stack

| Category          | Technology |
|--------------------|-------------|
| Framework          | [React 19](https://react.dev/) |
| Language           | [TypeScript 5.9](https://www.typescriptlang.org/) |
| Build Tool         | [Vite 7](https://vitejs.dev/) |
| State Management   | [Redux Toolkit](https://redux-toolkit.js.org/) |
| UI Components      | [Material UI](https://mui.com/) |
| Styling Engine     | [Emotion](https://emotion.sh/docs/introduction) |
| Testing            | [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) |
| Linting/Formatting | [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) |
| Git Hooks          | [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged) |

---

## 🧰 Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the built application |
| `npm run lint` | Run ESLint and automatically fix issues |
| `npm run test` | Run Jest test suites |
| `npm run prepare` | Set up Husky for Git hooks |

---

## Running the App

```bash
npm install && npm run prepare && npm run dev
```

## 🧪 Testing Setup

- **Environment:** jsdom  
- **Setup File:** `jest.setup.ts` (executed after environment setup)  
- **Testing Tools:**  
  - `@testing-library/react`  
  - `@testing-library/jest-dom`  
  - `@testing-library/user-event`  

```bash
npm run test

obssolution-test/
├── src/                 # Source code (React + TypeScript)
├── public/              # Static assets
├── jest.config.cjs      # Jest configuration
├── tsconfig.json        # TypeScript compiler settings
├── eslint.config.js     # ESLint configuration
├── .prettierrc          # Prettier formatting rules
├── package.json         # Project metadata & scripts
├── index.html           # Root HTML file
└── ...

npx prettier --write .
```

