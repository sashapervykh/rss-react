import { ColumnsWidget } from './components/ColumnsWidget/ColumnsWidget';
import { DataLoader } from './components/DataLoader/DataLoader';
import { Widget } from './components/Widget/Widget';
import { ControlsProvider } from './hooks/useControls/ControlsProvider';

function App() {
  return (
    <>
      <ControlsProvider>
        <Widget />
        <ColumnsWidget />
        <DataLoader />
      </ControlsProvider>
    </>
  );
}

export default App;
