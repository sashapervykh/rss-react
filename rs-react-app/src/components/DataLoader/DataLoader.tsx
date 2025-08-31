import { use } from 'react';
import { loadCO2Data } from '../../utilities/loadCO2Data';
import Table from '../Table/Table';
import { useControls } from '../../hooks/useControls/useControls';

export function DataLoader() {
  const data = use(loadCO2Data());
  const {
    controls: { year, country },
  } = useControls();

  return <Table data={data} year={year} country={country} />;
}
