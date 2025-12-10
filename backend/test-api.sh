#!/bin/bash

# Simple script to test the backend API endpoints
# Run this after starting the backend with: docker-compose up

BASE_URL="http://localhost/api"

echo "=== Testing Backend API ==="
echo ""

# Test health endpoint
echo "1. Testing health endpoint..."
curl -s "${BASE_URL}/health" | jq .
echo ""

# Test GET categories
echo "2. Testing GET /category..."
curl -s "${BASE_URL}/category" | jq .
echo ""

# Test GET todos
echo "3. Testing GET /todo..."
curl -s "${BASE_URL}/todo" | jq .
echo ""

# Test POST category
echo "4. Testing POST /category (create new category)..."
curl -s -X POST "${BASE_URL}/category" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Category"}' | jq .
echo ""

# Test POST category without name (should fail with 400)
echo "5. Testing POST /category without name (should fail)..."
curl -s -X POST "${BASE_URL}/category" \
  -H "Content-Type: application/json" \
  -d '{}' | jq .
echo ""

# Test POST todo
echo "6. Testing POST /todo (create new todo)..."
curl -s -X POST "${BASE_URL}/todo" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Test Todo",
    "description":"This is a test todo",
    "dueDate":"2025-12-31",
    "categoryId":2
  }' | jq .
echo ""

# Test POST todo without required fields (should fail with 400)
echo "7. Testing POST /todo without title (should fail)..."
curl -s -X POST "${BASE_URL}/todo" \
  -H "Content-Type: application/json" \
  -d '{"categoryId":2}' | jq .
echo ""

# Test GET non-existent todo (should fail with 404)
echo "8. Testing GET non-existent resource (should fail with 404)..."
curl -s -X DELETE "${BASE_URL}/todo/99999" -w "\nHTTP Status: %{http_code}\n"
echo ""

echo "=== API Tests Complete ==="

