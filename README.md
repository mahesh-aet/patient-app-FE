# Patient UI

Frontend application for patient management built with React, TypeScript, Vite, Material UI, and Redux Toolkit.

## Features

- View all patients in a table.
- Create a new patient using a form.
- Inline edit patient details in the table.
- Delete patients from the table.
- Success and error toast messages for create, update, and delete operations.
- API integration via Redux Toolkit thunks.
- Unit tests for patient form and patient table using Jest and React Testing Library.

## Tech Stack

- React 19
- TypeScript
- Vite
- Material UI
- Redux Toolkit + React Redux
- Axios
- Formik + Yup
- Jest + React Testing Library

## Prerequisites

- Node.js 18+
- npm 9+
- Backend service running for patient APIs

By default, this app calls:

`http://localhost:8080/api/v1/patient`

Make sure the backend is running on this URL or update `src/api/patientApi.ts`.

## Installation

```bash
npm install
```

## Run The App

Start the development server:

```bash
npm run dev
```

Then open the URL shown in terminal (usually `http://localhost:5173`).

## Available Scripts

Run development server:

```bash
npm run dev
```

Run unit tests:

```bash
npm run test
```

## Project Structure (High Level)

- `src/pages` - Page components
- `src/components/patient` - Patient form and table components
- `src/store` - Redux store, slice, hooks, and thunks
- `src/api` - API functions
- `src/type` - TypeScript interfaces
