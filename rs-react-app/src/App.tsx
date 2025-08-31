import { Suspense } from 'react';
import { ColumnsWidget } from './components/ColumnsWidget/ColumnsWidget';
import { DataLoader } from './components/DataLoader/DataLoader';
import { Widget } from './components/Widget/Widget';
import { ControlsProvider } from './hooks/useControls/ControlsProvider';
import { Spinner } from './components/Spinner/Spinner';
import { ColumnsProvider } from './hooks/useColumns/ColumnsProvider';

function App() {
  return (
    <>
      <ControlsProvider>
        <ColumnsProvider>
          <Widget />
          <ColumnsWidget />
          <Suspense fallback={<Spinner />}>
            <DataLoader />
          </Suspense>
        </ColumnsProvider>
      </ControlsProvider>
    </>
  );
}

export default App;
