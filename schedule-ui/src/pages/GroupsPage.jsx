import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MOCK = [
  { id: '1', name: 'ІС-31', specialty: 'Інформаційні системи', year: 3, students: 25 },
  { id: '2', name: 'ІС-32', specialty: 'Інформаційні системи', year: 3, students: 22 },
  { id: '3', name: 'КН-21', specialty: 'Комп\'ютерні науки', year: 2, students: 30 },
];

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getGroups()
      .then(data => setGroups(Array.isArray(data) ? data : MOCK))
      .catch(() => setGroups(MOCK))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-slate-500">Завантаження...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Групи</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map(g => (
          <Card key={g.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{g.name}</CardTitle>
                <Badge variant="outline">{g.year} курс</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm text-slate-600">{g.specialty}</p>
              <p className="text-sm text-slate-500">👥 {g.students} студентів</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}