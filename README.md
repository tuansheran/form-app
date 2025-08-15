# Client Onboarding Form

A React + Next.js client onboarding form using **React Hook Form** and **Zod** for validation. Includes form validation, query param pre-fill, and unit tests for the schema.

---

## Features

* Full client onboarding form
* Real-time validation with Zod
* Pre-fill services via query parameters
* POST form data to external API
* Unit tests for validation schema

---

## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/client-onboarding-form.git
cd client-onboarding-form
```

2. **Install dependencies using Yarn**:

```bash
yarn
```

3. **Create `.env.local` file** (optional):

```env
NEXT_PUBLIC_ONBOARD_URL=https://postman-echo.com/post
```

4. **Run the development server**:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Running Tests

1. **Run all unit tests**:

```bash
yarn test
```

2. **Run tests in watch mode**:

```bash
yarn test --watch
```

---

## Project Structure

```
/src
  /app
    onboarding-page.tsx      # Main form page
  /lib
    schema.ts                # Zod schema & FormData type
  /constants
    styles.ts                # Input classes & styling constants
  /test
    schema.test.ts           # Unit tests for Zod schema
```

---

## Notes

* The form posts to `NEXT_PUBLIC_ONBOARD_URL`, defaults to Postman Echo for testing.
* Styles use TailwindCSS and custom input classes.
* Jest + ts-jest is used for unit testing.

