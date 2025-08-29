import { use, useEffect, useState } from 'react';
import { loadCO2Data } from '../../utilities/loadCO2Data';
import { Table } from '../Table/Table';

import { useControls } from '../../hooks/useControls/useControls';
import type { DisplayedDataType } from '../../models/schema';
import { filterData } from '../../utilities/filterData';
import { filterYear } from '../../utilities/filterYear';

export function DataLoader() {
  const { controls } = useControls();
  const data = use(loadCO2Data());
  const [dataToDisplay, setDataToDisplay] = useState<DisplayedDataType>(data);

  useEffect(() => {
    let newData = [...data];

    if (controls.country) {
      newData = filterData(newData, controls.country);
    }
    if (controls.year) {
      newData = filterYear(newData, controls.year);
    }
    setDataToDisplay(newData);
  }, [controls, data]);

  return <Table data={dataToDisplay} />;
}
