import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MOCK = [
  { id: '1', name: 'Іваненко Петро Сергійович', department: 'Математика', subjects: ['Математичний аналіз', 'Фізика'] },
  { id: '2', name: 'Коваленко Олена Миколаївна', department: 'Інформатика', subjects: ['Програмування', 'Бази даних'] },
  { id: '3', name: 'Шевченко Андрій Васильович', department: 'Фізика', subjects: ['Фізика'] },
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTeachers()
    .then(data => setTeachers(Array.isArray(data) && data.length > 0 ? data : MOCK))      .catch(() => setTeachers(MOCK))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-slate-500">Завантаження...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Викладачі</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map(t => (
          <Card key={t.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t.name}</CardTitle>
              <p className="text-sm text-slate-500">{t.department}</p>            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {(t.subjects || []).map((s, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}