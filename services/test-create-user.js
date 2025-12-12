const axios = require('axios');

async function createUser() {
  try {
    const response = await axios.post('http://localhost:3001/api/users', {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('User created successfully:', response.data);
  } catch (error) {
    console.error('Failed to create user:', error.response ? error.response.data : error.message);
  }
}

createUser();