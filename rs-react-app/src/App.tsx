import { Route, Routes } from 'react-router';
import './App.css';
import { PageMain } from './components/PageMain/PageMain';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageMain />}></Route>
    </Routes>
  );
}

export default App;
