import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DAYS = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця'];
const TIMES = ['08:30', '10:10', '11:50', '13:30', '15:10'];

const MOCK = [
  { id: '1', dayOfWeek: 'Понеділок', timeSlot: '08:30', weekType: 'обидві',
    subject: { name: 'Математичний аналіз' },
    teacher: { name: 'Іваненко П.С.' },
    group: { name: 'ІС-31' },
    classroom: { number: '101' } },
  { id: '2', dayOfWeek: 'Вівторок', timeSlot: '10:10', weekType: 'чисельник',
    subject: { name: 'Програмування' },
    teacher: { name: 'Коваленко О.М.' },
    group: { name: 'ІС-31' },
    classroom: { number: '202' } },
  { id: '3', dayOfWeek: 'Середа', timeSlot: '11:50', weekType: 'обидві',
    subject: { name: 'Бази даних' },
    teacher: { name: 'Шевченко А.В.' },
    group: { name: 'КН-21' },
    classroom: { number: '305' } },
];

const weekColors = {
  'обидві': 'bg-blue-100 text-blue-800',
  'чисельник': 'bg-green-100 text-green-800',
  'знаменник': 'bg-orange-100 text-orange-800',
};

export default function SchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, g] = await Promise.all([api.getSchedule(), api.getGroups()]);
        setSchedule(Array.isArray(s) ? s : MOCK);
        setGroups(Array.isArray(g) ? g : []);
      } catch {
        setSchedule(MOCK);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = selectedGroup === 'all'
    ? schedule
    : schedule.filter(s => s.group?.name === selectedGroup);

  const getCell = (day, time) =>
    filtered.filter(s => s.dayOfWeek === day && s.timeSlot === time);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-slate-500">Завантаження...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Розклад занять</h1>
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Всі групи" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всі групи</SelectItem>
            {groups.map(g => (
              <SelectItem key={g.id} value={g.name}>{g.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Десктоп таблиця */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3 text-left text-sm font-semibold text-slate-600 border">Час</th>
              {DAYS.map(d => (
                <th key={d} className="p-3 text-center text-sm font-semibold text-slate-600 border">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIMES.map(time => (
              <tr key={time} className="hover:bg-slate-50">
                <td className="p-3 text-sm font-medium text-slate-600 border whitespace-nowrap">{time}</td>
                {DAYS.map(day => {
                  const cells = getCell(day, time);
                  return (
                    <td key={day} className="p-2 border align-top min-w-36">
                      {cells.map(c => (
                        <div key={c.id} className="bg-white rounded-lg border p-2 mb-1 shadow-sm">
                          <p className="font-semibold text-xs text-slate-800">{c.subject?.name}</p>
                          <p className="text-xs text-slate-500">{c.teacher?.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-slate-400">ауд. {c.classroom?.number}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${weekColors[c.weekType]}`}>
                              {c.weekType}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs mt-1">{c.group?.name}</Badge>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Мобільний вигляд */}
      <div className="md:hidden space-y-4">
        {DAYS.map(day => (
          <Card key={day}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {TIMES.map(time => {
                const cells = getCell(day, time);
                if (!cells.length) return null;
                return cells.map(c => (
                  <div key={c.id} className="bg-slate-50 rounded-lg p-3 border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-600">{time}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${weekColors[c.weekType]}`}>
                        {c.weekType}
                      </span>
                    </div>
                    <p className="font-semibold text-sm">{c.subject?.name}</p>
                    <p className="text-xs text-slate-500">{c.teacher?.name}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{c.group?.name}</Badge>
                      <span className="text-xs text-slate-400">ауд. {c.classroom?.number}</span>
                    </div>
                  </div>
                ));
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}