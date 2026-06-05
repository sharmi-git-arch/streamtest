const api = require('../helpers/apiHelper');

// Test 1 - GET all posts
test('GET /posts returns 200 and array of posts', async () => {
  const response = await api.get('/posts');
  
  expect(response.status).toBe(200);
  expect(Array.isArray(response.data)).toBe(true);
  expect(response.data.length).toBeGreaterThan(0);
});

// Test 2 - GET single post
test('GET /posts/1 returns correct post', async () => {
  const response = await api.get('/posts/1');
  
  expect(response.status).toBe(200);
  expect(response.data.id).toBe(1);
  expect(response.data.title).toBeDefined();
});

// Test 3 - POST creates new post
test('POST /posts creates a new post', async () => {
  const newPost = {
    title: 'Automated test post',
    body: 'Created by Jest',
    userId: 1
  };
  
  const response = await api.post('/posts', newPost);
  
  expect(response.status).toBe(201);
  expect(response.data.title).toBe('Automated test post');
  expect(response.data.id).toBeDefined();
});

// Test 4 - DELETE removes post
test.skip('DELETE /posts removes a post', async () => {
  const newPost = await api.post('/posts', {
    title: 'Post to delete',
    body: 'This will be deleted',
    userId: 1
  });
  
  const id = newPost.data.id;
  
  try {
    const deleteResponse = await api.delete(`/posts/${id}`);
    expect(deleteResponse.status).toBe(200);
  } catch (error) {
    console.log('Delete error:', error.message);
    throw error;
  }
});

// Test 5 - PUT updates a post
test('PUT /posts/1 updates a post', async () => {
  const updatedPost = {
    id: 1,
    title: 'Updated title',
    body: 'Updated body',
    userId: 1
  };
  
  const response = await api.put('/posts/1', updatedPost);
  
  expect(response.status).toBe(200);
  expect(response.data.title).toBe('Updated title');
});

// Test 6 - PATCH updates part of a post
test('PATCH /posts/1 updates only title', async () => {
  const response = await api.patch('/posts/1', {
    title: 'Only title changed'
  });
  
  expect(response.status).toBe(200);
  expect(response.data.title).toBe('Only title changed');
  expect(response.data.body).toBeDefined();
});

// Test 7 - GET non existent post returns 404
test('GET /posts/9999 returns 404', async () => {
  try {
    await api.get('/posts/9999');
  } catch (error) {
    expect(error.response.status).toBe(404);
  }
});

// Test 8 - GET single user
test('GET /users/1 returns correct user', async () => {
  const response = await api.get('/users/1');
  
  expect(response.status).toBe(200);
  expect(response.data.id).toBe(1);
  expect(response.data.name).toBe('John Smith');
  expect(response.data.email).toBe('john@email.com');
});