import { use } from 'react';
import { loadCO2Data } from '../../utilities/loadCO2Data';
import { Table } from '../Table/Table';

export function DataLoader() {
  const data = use(loadCO2Data());
  return <Table data={data} />;
}
