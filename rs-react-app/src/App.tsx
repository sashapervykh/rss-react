import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import { PageMain } from './components/PageMain/PageMain';
import { AboutPage } from './components/AboutPage/AboutPage';
import { CardDetails } from './components/CardDetails/CardDetails';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Layout } from './components/Layout/Layout';

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
