import { Navigate, Route, Routes } from 'react-router';

import './App.css';
import { CardDetails } from './components/CardDetails/CardDetails';
import { Layout } from './components/Layout/Layout';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PageMain } from './pages/PageMain/PageMain';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" />}></Route>
        <Route path="/home" element={<PageMain />}>
          <Route index element={<CardDetails />}></Route>
        </Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
