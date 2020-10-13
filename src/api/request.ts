import axios from 'axios';

// eslint-disable-next-line max-len
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjZkZjNmZTFiOTVkNzQ2ZWNhYjJhNzQiLCJpYXQiOjE2MDE2NzA2MzEsImV4cCI6MTYwMTg0MzQzMSwiYXVkIjoid3d3LnNhdmVwYXdzLmNvbSIsImlzcyI6IlNhdmVQYXdzIENvcnAifQ.AFDoAZBRAOwSwL8EZ0_8cp9zLwRrYCpPKSBb7emXJA4';

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export { http };
