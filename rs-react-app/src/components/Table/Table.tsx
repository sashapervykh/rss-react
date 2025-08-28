import { use } from 'react';
import { loadCO2Data } from '../../utilities/loadCO2Data';

export function Table() {
  const data = use(loadCO2Data());
  return <div>{JSON.stringify(data)}</div>;
}
