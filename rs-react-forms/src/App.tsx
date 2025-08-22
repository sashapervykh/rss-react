import { Provider } from 'react-redux';
import './App.css';
import { ButtonsWrapper } from './components/ButtonsWrapper/ButtonsWrapper';
import { ModalProvider } from './hooks/useModal/ModalProvider';
import { setupStore } from './store/store';

function App() {
  return (
    <>
      <Provider store={setupStore()}>
        <ModalProvider>
          <ButtonsWrapper />
        </ModalProvider>
      </Provider>
    </>
  );
}

export default App;
