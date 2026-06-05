const api = require('../helpers/apiHelper');

// Test 1 - GET all users
test('GET /users returns 200 and array', async () => {
  const response = await api.get('/users');
  
  expect(response.status).toBe(200);
  expect(Array.isArray(response.data)).toBe(true);
  expect(response.data.length).toBeGreaterThan(0);
});

// Test 2 - GET single user
test('GET /users/1 returns correct user', async () => {
  const response = await api.get('/users/1');
  
  expect(response.status).toBe(200);
  expect(response.data.id).toBe(1);
  expect(response.data.name).toBe('John Smith');
  expect(response.data.email).toBe('john@email.com');
});

// Test 3 - POST creates new user
test('POST /users creates a new user', async () => {
  const newUser = {
    name: 'Test User',
    email: 'test@email.com'
  };
  
  const response = await api.post('/users', newUser);
  
  expect(response.status).toBe(201);
  expect(response.data.name).toBe('Test User');
  expect(response.data.email).toBe('test@email.com');
  expect(response.data.id).toBeDefined();
});

// Test 4 - GET non existent user returns 404
test('GET /users/9999 returns 404', async () => {
  try {
    await api.get('/users/9999');
  } catch (error) {
    expect(error.response.status).toBe(404);
  }
});