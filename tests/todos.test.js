const api = require('../helpers/apiHelper');

// Test 1 - GET all todos
test('GET /todos returns 200 and array', async () => {
  const response = await api.get('/todos');
  
  expect(response.status).toBe(200);
  expect(Array.isArray(response.data)).toBe(true);
  expect(response.data.length).toBeGreaterThan(0);
});

// Test 2 - GET single todo
test('GET /todos/1 returns correct todo', async () => {
  const response = await api.get('/todos/1');
  
  expect(response.status).toBe(200);
  expect(response.data.id).toBe(1);
  expect(typeof response.data.completed).toBe('boolean');
});

// Test 3 - POST creates new todo
test('POST /todos creates a new todo', async () => {
  const newTodo = {
    title: 'Buy groceries',
    completed: false,
    userId: 1
  };
  
  const response = await api.post('/todos', newTodo);
  
  expect(response.status).toBe(201);
  expect(response.data.title).toBe('Buy groceries');
  expect(response.data.completed).toBe(false);
  expect(response.data.id).toBeDefined();
});

// Test 4 - PATCH marks todo as completed
test('PATCH /todos/1 marks todo as completed', async () => {
  const response = await api.patch('/todos/1', {
    completed: true
  });
  
  expect(response.status).toBe(200);
  expect(response.data.completed).toBe(true);
});

// Test 5 - DELETE removes todo
test('DELETE /todos removes a todo', async () => {
  const newTodo = await api.post('/todos', {
    title: 'Todo to delete',
    completed: false,
    userId: 1
  });
  
  const id = newTodo.data.id;
  const deleteResponse = await api.delete(`/todos/${id}`);
  expect(deleteResponse.status).toBe(200);
});

// Test 6 - GET non existent todo returns 404
test('GET /todos/9999 returns 404', async () => {
  try {
    await api.get('/todos/9999');
  } catch (error) {
    expect(error.response.status).toBe(404);
  }
});