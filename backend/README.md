# Backend API

TypeScript Express backend with in-memory data storage.

## Tech Stack

- **Node.js**: v22
- **TypeScript**: v5.9
- **Express**: v5.2
- **http-status-codes**: v2.3
- **In-Memory Storage**: Data stored in memory (resets on server restart)

## API Endpoints

### Categories

- `GET /api/category` - Get all categories
- `POST /api/category` - Create a new category
  - Body: `{ "name": "Category Name" }`
- `PUT /api/category/:id` - Update a category
  - Body: `{ "name": "Updated Name" }`
- `DELETE /api/category/:id` - Delete a category
  - Returns: `204 No Content` on success

### Todos

- `GET /api/todo` - Get all todos
- `POST /api/todo` - Create a new todo
  - Body: `{ "title": "...", "description": "...", "dueDate": "YYYY-MM-DD", "categoryId": 1 }`
  - Note: `createdDate` is automatically generated
  - Note: `categoryId` must reference an existing category (validated)
- `PUT /api/todo/:id` - Update a todo
  - Body: `{ "title": "...", "description": "...", "dueDate": "...", "completed": true/false, "categoryId": 1, "createdDate": "..." }`
  - Note: `createdDate` and `categoryId` are checked for stale object detection (returns 409 Conflict if changed)
  - Note: New `categoryId` must exist if being updated (validated)
- `DELETE /api/todo/:id` - Delete a todo
  - Returns: `204 No Content` on success

### Health Check

- `GET /api/health` - Check API status
  - Returns: `{ "status": "ok", "message": "Backend is running" }`

## Development

### Local Development

```bash
# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run dev

# Run in production mode
npm start

# Build TypeScript
npm run build
```

Server runs on `http://localhost:3000`

### Docker

```bash
# From project root
docker-compose up --build
```

## Data Models

### Category Interface
```typescript
{
  id: number;        // Auto-incremented
  name: string;
}
```

### Todo Interface
```typescript
{
  id: number;           // Auto-incremented
  title: string;
  description: string;
  dueDate: string | null;
  createdDate: string;  // ISO 8601 format (auto-generated on creation)
  completed: boolean;   // Default: false
  categoryId: number;   // Foreign key reference to Category
}
```

## Data Storage

This backend uses **in-memory storage**. Data is stored in arrays within the application and will be reset when the server restarts.

### Initial Data

The application starts with pre-populated data:

**Categories:**
- All (id: 1)
- Project management (id: 2)
- Hardware (id: 3)
- Firmware (id: 4)
- Control portal (id: 5)

**Sample Todos:**
- Complete coding assessment
- Frontend skeleton
- Backend APIs
- Frontend interacting with backend

## Validation Rules

### Category ID Validation
- When creating or updating a todo, the `categoryId` must reference an existing category
- Returns `400 Bad Request` if the category doesn't exist

### Stale Object Detection
- When updating a todo, the API checks if `createdDate` or `categoryId` have been modified by another request
- Returns `409 Conflict` if stale data is detected
- This prevents lost updates in concurrent scenarios

## HTTP Status Codes

The API uses semantic HTTP status codes via the `http-status-codes` library:
- `200 OK` - Successful GET, POST, or PUT
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Invalid data (e.g., non-existent categoryId)
- `404 Not Found` - Resource not found
- `409 Conflict` - Stale object (concurrent modification detected)

