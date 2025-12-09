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

