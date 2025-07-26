import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import { PageMain } from './components/PageMain/PageMain';
import { AboutPage } from './components/AboutPage/AboutPage';
import { CardDetails } from './components/CardDetails/CardDetails';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<PageMain />}>
        <Route index element={<CardDetails />}></Route>
      </Route>
      <Route path="/about" element={<AboutPage />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
