import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SchedulePage from './pages/SchedulePage';
import GroupsPage from './pages/GroupsPage';
import TeachersPage from './pages/TeachersPage';
import Layout from './components/layout/Layout';

const isAuth = () => !!localStorage.getItem('token');

function PrivateRoute({ children }) {
  return isAuth() ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>}>
            
          <Route index element={<SchedulePage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="teachers" element={<TeachersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}