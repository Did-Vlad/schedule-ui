const API_URL = 'http://localhost:3001/api';

const getToken = () => localStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

export const api = {
  // Auth
  login: (email, password) =>
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(r => r.json()),

  // Schedule
  getSchedule: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_URL}/schedule?${query}`, { headers: headers() }).then(r => r.json());
  },

  // Groups
  getGroups: () =>
    fetch(`${API_URL}/groups`, { headers: headers() }).then(r => r.json()),

  // Teachers
  getTeachers: () =>
    fetch(`${API_URL}/teachers`, { headers: headers() }).then(r => r.json()),

  // Subjects
  getSubjects: () =>
    fetch(`${API_URL}/subjects`, { headers: headers() }).then(r => r.json()),

  // Classrooms
  getClassrooms: () =>
    fetch(`${API_URL}/classrooms`, { headers: headers() }).then(r => r.json()),
};