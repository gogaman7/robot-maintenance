import type { Todo, Category } from '../components/TodoAppCard';

const API_BASE = '/api';

interface ApiError {
  error: string;
  status: number;
}

class ApiService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // If response is not JSON, use the default error message
      }
      throw { error: errorMessage, status: response.status } as ApiError;
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return null as T;
    }

    return response.json();
  }

  // Categories API
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE}/category`);
    return this.handleResponse<Category[]>(response);
  }

  async createCategory(name: string): Promise<Category> {
    const response = await fetch(`${API_BASE}/category`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    return this.handleResponse<Category>(response);
  }

  async updateCategory(id: number, name: string): Promise<Category> {
    const response = await fetch(`${API_BASE}/category/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    return this.handleResponse<Category>(response);
  }

  async deleteCategory(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/category/${id}`, {
      method: 'DELETE'
    });
    return this.handleResponse<void>(response);
  }

  // Todos API
  async getTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE}/todo`);
    return this.handleResponse<Todo[]>(response);
  }

  async createTodo(todo: Omit<Todo, 'id' | 'completed' | 'createdDate'>): Promise<Todo> {
    const response = await fetch(`${API_BASE}/todo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    });
    return this.handleResponse<Todo>(response);
  }

  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
    const response = await fetch(`${API_BASE}/todo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return this.handleResponse<Todo>(response);
  }

  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/todo/${id}`, {
      method: 'DELETE'
    });
    return this.handleResponse<void>(response);
  }

  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await fetch(`${API_BASE}/health`);
    return this.handleResponse(response);
  }
}

export const api = new ApiService();
export type { ApiError };

