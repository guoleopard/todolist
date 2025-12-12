# Todo List Backend Services

This is the backend service for the todo list website, built with Node.js, Express, and MySQL.

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8 or higher)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure MySQL database:
   - Create a database named `todolist`
   - Update the database credentials in `config/db.js` if needed

3. Run the database initialization script:
```bash
mysql -u root -p < init.sql
```

## Running the Application

### Development mode
```bash
npm run dev
```

### Production mode
```bash
npm start
```

The server will run on `http://localhost:3001`

## API Endpoints

### Get all todos
```
GET /api/todos
```

### Get todo by ID
```
GET /api/todos/:id
```

### Create new todo
```
POST /api/todos
Body: { "title": "Todo title", "description": "Todo description (optional)" }
```

### Update todo
```
PUT /api/todos/:id
Body: { "title": "Updated title", "description": "Updated description", "completed": false }
```

### Delete todo
```
DELETE /api/todos/:id
```

### Health check
```
GET /api/health
```