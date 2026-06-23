export const api = {
    login: async (email, password) => {
      if (email === 'admin@university.ua' && password === 'admin123') {
        return { token: 'mock-token', user: { name: 'Адміністратор', role: 'admin' } };
      }
      return { error: 'Невірний email або пароль' };
    },
  
    getSchedule: async () => [],
    getGroups: async () => [],
    getTeachers: async () => [],
    getSubjects: async () => [],
    getClassrooms: async () => [],
  };