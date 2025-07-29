// Test Vapi API key directly
const apiKey = 'eec3d55e-912b-4415-adfd-82abf31cc67c';

fetch('https://api.vapi.ai/call', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${apiKey}`
  }
})
.then(response => {
  console.log('Status:', response.status);
  return response.json();
})
.then(data => console.log('Response:', data))
.catch(error => console.error('Error:', error));