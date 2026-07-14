# Mastering Mongoose

This repository is a **learning journey project** where I practiced building a backend with **Node.js + Express + TypeScript + Mongoose**.

The code focuses on understanding Mongoose fundamentals through a `Student` module:
- schema design
- nested subdocuments
- validation (Mongoose + Zod, and also a Joi version)
- model static/instance patterns
- virtuals
- middleware hooks
- soft delete pattern
- REST API integration

## Tech Stack

- Node.js
- TypeScript
- Express
- Mongoose
- Zod
- Joi
- ESLint + Prettier

## Project Structure

```text
src/
  app.ts
  server.ts
  app/
    config/
      index.ts
    modules/
      student.model.ts
      student/
        student.interface.ts
        student.validation.ts
        student.joi.validation.ts
        student.service.ts
        student.controller.ts
        student.route.ts
```

## What I Practiced in This Project

### 1) Mongoose Schema Design
In `student.model.ts`, the student schema is composed using reusable nested schemas:
- `userNameSchema`
- `guardianSchema`
- `localGuardianSchema`

This helped practice modeling real-world document structures with nested objects.

### 2) Field Rules and Validation
I explored:
- required fields
- `enum` constraints (gender, blood group, status)
- unique fields (`id`, `email`)
- custom validation with `validator` package (`isEmail`, `isAlpha`)

I also added request-level validation with **Zod** (`student.validation.ts`) and kept an alternate **Joi** version (`student.joi.validation.ts`) for learning comparison.

### 3) Virtuals
A virtual field `fullName` is defined to combine first/middle/last name without storing extra data.

### 4) Middleware (Hooks)
I practiced query middleware:
- `pre('find')`
- `pre('findOne')`
- `pre('aggregate')`

These hooks implement soft-delete filtering (`isDeleted: { $ne: true }`) automatically.

### 5) Instance Methods
An instance method `isUserExists` checks whether a student already exists by ID before save.

### 6) CRUD API Flow with Layered Design
The student feature is organized into:
- route layer (`student.route.ts`)
- controller layer (`student.controller.ts`)
- service/data layer (`student.service.ts`)
- model layer (`student.model.ts`)

This gave practice on clean module separation.

## API Endpoints

Base route: `/api/v1/students`

- `GET /` → get all students
- `POST /create-student` → create a student
- `GET /:studentId` → get one student by custom ID
- `PATCH /:studentId` → update student
- `DELETE /:studentId` → soft delete student (`isDeleted = true`)

## Setup and Run

## 1) Install dependencies

```bash
npm install
```

## 2) Create `.env`

```env
PORT=3000
DATABASE_URL=your_mongodb_connection_string
```

## 3) Run in development

```bash
npm run dev
```

## Useful Scripts

```bash
npm run lint
npm run lint:fix
npm run build
npm run prettier
npm run prettier:fix
```

> Note: this learning repo currently has no real test suite (`npm test` is a placeholder).

## Learning Notes

- This project is intentionally focused on Mongoose practice rather than production readiness.
- Some commented sections (like password hashing middleware) were kept for future learning steps.
- The code demonstrates practical Mongoose concepts in one module-driven example.

## Mongoose References (Official)

- Mongoose Home: https://mongoosejs.com/
- Getting Started: https://mongoosejs.com/docs/
- Schemas: https://mongoosejs.com/docs/guide.html
- Models: https://mongoosejs.com/docs/models.html
- Validation: https://mongoosejs.com/docs/validation.html
- Middleware: https://mongoosejs.com/docs/middleware.html
- Virtuals: https://mongoosejs.com/docs/tutorials/virtuals.html
- Query API: https://mongoosejs.com/docs/queries.html

## Acknowledgement

This repository is part of my personal learning journey to master Mongoose by coding hands-on examples.
