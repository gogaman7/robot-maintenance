# Robot Maintenance Project

This repository contains the full stack application for the Robot Maintenance project.

## Project Structure

- `frontend/`: React + TypeScript + Vite application
- `backend/`: Backend service (currently a placeholder)
- `nginx/`: Nginx proxy configuration
- `docker-compose.yaml`: Orchestration for the full stack

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Standing up the Full Stack

To start the entire application stack (Frontend + Backend + Nginx Proxy), run:

```bash
docker-compose up --build
```

**Troubleshooting:**

If you encounter a "context deadline exceeded" error or connection issues during the build, try using the legacy builder:

```bash
DOCKER_BUILDKIT=0 docker compose up -d --build
```

### Accessing the Application

Once the services are running, you can access them via:

- **Frontend (via Proxy):** [http://localhost](http://localhost)
- **Backend API (via Proxy):** [http://localhost/api](http://localhost/api)
- **Frontend (Direct):** [http://localhost:5173](http://localhost:5173)
- **Backend (Direct):** [http://localhost:3000](http://localhost:3000)

## Development

The setup includes hot-reloading for the frontend. Changes made to files in `frontend/src` will automatically reflect in the browser.

## API Integration

The frontend communicates with the backend through the `/api` endpoint, which is proxied by Nginx to the backend service.

### API Endpoints

#### Categories
- `GET /api/category` - Get all categories
- `POST /api/category` - Create a new category (requires `name` in body)
- `PUT /api/category/:id` - Update a category (requires `name` in body)
- `DELETE /api/category/:id` - Delete a category

#### Todos
- `GET /api/todo` - Get all todos
- `POST /api/todo` - Create a new todo (requires `title`, `categoryId`, optional: `description`, `dueDate`)
- `PUT /api/todo/:id` - Update a todo (partial updates supported)
- `DELETE /api/todo/:id` - Delete a todo

#### Health
- `GET /api/health` - Check backend health status

### Error Handling

The backend returns appropriate HTTP status codes for different scenarios:

- **200 OK** - Successful GET or PUT request
- **201 Created** - Successful POST request (resource created)
- **204 No Content** - Successful DELETE request
- **400 Bad Request** - Invalid request data (missing required fields, invalid format)
- **404 Not Found** - Resource not found
- **409 Conflict** - Stale object error (concurrent modification detected)
- **500 Internal Server Error** - Server-side error

Error responses include a JSON body with an `error` field describing the issue:

```json
{
  "error": "Category name is required"
}
```

The frontend API service (`frontend/src/services/api.ts`) automatically handles these errors and provides user-friendly error messages.

