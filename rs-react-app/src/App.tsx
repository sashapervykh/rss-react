import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import { PageMain } from './components/PageMain/PageMain';
import { AboutPage } from './components/AboutPage/AboutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<PageMain />}></Route>
      <Route path="/about" element={<AboutPage />}></Route>
    </Routes>
  );
}

export default App;
