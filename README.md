# zoftify-nestjs
Backend developer (NestJS) - Assessment Test

# NestJS Backend

This is a fully functioning NestJS project demonstrating:
1. CRUD (User entity)
2. Custom logging middleware
3. Global exception filter
4. PostgreSQL integration via TypeORM
5. Optional JWT Auth
6. Sample unit test (test/user.service.spec.ts)

---

## Installation

1. **Install Dependencies**  
   ```bash
   npm install

2 **Environment Variables**
Make sure you have a .env file at the root with your PostgreSQL and JWT settings:
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=nestjs_backend
JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=3600

3. Run the App
npm install @nestjs/config
npm install @nestjs/common
npm install @nestjs/jwt


npm run start:dev

Visit http://localhost:3000 in your browser.


Usage
Auth Endpoints

    POST /auth/register

        Body: { "email": "test@example.com", "password": "secret", "name": "Test" }

    POST /auth/login

        Body: { "email": "test@example.com", "password": "secret" }

        Returns: { access_token: "...", userId: 1, email: "test@example.com" }

User Endpoints

    POST /users
    (Creates a user; you can also just use /auth/register if you prefer)

    GET /users
    (Protected by JWT. Must include Authorization: Bearer <token>)

    GET /users/:id
    (Protected by JWT)

    PATCH /users/:id
    (Protected by JWT)

    DELETE /users/:id
    (Protected by JWT)



Testing
npm run test
This runs Jest unit tests (see test/user.service.spec.ts for an example).



Notes

    Database: By default, this uses TypeORM with synchronize: true, which automatically creates tables.

    Production: For production, you should use migrations instead of synchronize, store secrets safely, etc.