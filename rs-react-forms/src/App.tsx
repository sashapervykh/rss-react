import './App.css';
import { ButtonsWrapper } from './components/ButtonsWrapper/ButtonsWrapper';
import { ModalProvider } from './hooks/useModal/ModalProvider';

function App() {
  return (
    <>
      <ModalProvider>
        <ButtonsWrapper />
      </ModalProvider>
    </>
  );
}

export default App;
