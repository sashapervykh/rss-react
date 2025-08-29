import { Suspense } from 'react';
import { ColumnsWidget } from './components/ColumnsWidget/ColumnsWidget';
import { DataLoader } from './components/DataLoader/DataLoader';
import { Widget } from './components/Widget/Widget';
import { ControlsProvider } from './hooks/useControls/ControlsProvider';
import { Spinner } from './components/Spinner/Spinner';

function App() {
  return (
    <>
      <ControlsProvider>
        <Widget />
        <ColumnsWidget />
        <Suspense fallback={<Spinner />}>
          <DataLoader />
        </Suspense>
      </ControlsProvider>
    </>
  );
}

export default App;
