import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-800"> Розклад</span>
          </div>
          <div className="flex items-center gap-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'
              }>

Розклад
    </NavLink>
    <NavLink
    to="/groups"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'
              }
            >
              Групи
            </NavLink>
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'
              }
            >
              Викладачі
            </NavLink>
            <Button variant="outline" size="sm" onClick={logout}>
              Вийти
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}