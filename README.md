# React + Vite

## AI analysis setup

Startup analysis uses Firebase AI Logic with the Gemini Developer API directly from the signed-in app. The client falls back to local analysis if AI is unavailable. A Firebase callable function is also included for a future server-side deployment.

```bash
firebase functions:secrets:set GEMINI_API_KEY
firebase deploy --only functions:generateStartupAnalysis
```

Enable Firebase AI Logic and the Gemini Developer API for the `rs-venturepilot` project in the Firebase console. Run `npm install` inside `functions/` before deploying the optional server-side function.

Firebase Cloud Functions deployment requires the project to use the Blaze (pay-as-you-go) plan because Google Cloud Build and Artifact Registry are required.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
