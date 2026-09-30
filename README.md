# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
## MongoDB Student API

1. Copy `.env.example` to `.env` and set `MONGODB_URI` to your local MongoDB URL or MongoDB Atlas connection string.
2. In one terminal, run `npm run server` to start the Express API on port 5000.
3. In another terminal, run `npm run dev` to start the Vite app. Vite forwards `/api` requests to the API.

The API supports `GET`, `POST`, `PUT`, and `DELETE` at `/api/students`. The `.env` file is ignored by Git.
