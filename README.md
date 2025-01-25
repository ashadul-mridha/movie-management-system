# Movie Management System

A comprehensive backend system for managing movies, users, ratings, and reports, built with **NestJS**. This project includes authentication, role-based access control, database management with TypeORM, and API documentation using Swagger.

---

## Features

- User and Admin authentication using JWT.
- CRUD operations for movies, users, and ratings.
- Reporting system for movie reviews.
- Database migrations using TypeORM.
- API documentation via Swagger.

---

## Technologies Used

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: MySQL with [TypeORM](https://typeorm.io/)
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Class Validator and Class Transformer
- **API Documentation**: Swagger
- **Environment Management**: dotenv

---

## Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **NPM**: v9.x or higher
- **MySQL**: v8.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone <https://github.com/ashadul-mridha/movie-management-system.git>
   cd movie-management-

   ```

### Start Project

- `npm install`
- `npm run start:dev`

### Database Migration

- `npm run migration:generate --name="fileName"`
- `npm run migration:run`
