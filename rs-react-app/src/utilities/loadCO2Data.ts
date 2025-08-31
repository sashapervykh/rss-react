import { DatasetSchema, type DisplayedDataType } from '../models/schema';

let dataPromise: Promise<DisplayedDataType>;

export function loadCO2Data() {
  if (!dataPromise) {
    dataPromise = fetch('/co2-data.json')
      .then((res) => res.json())
      .then((json) => {
        const dataArray: DisplayedDataType = [];
        const typedData = DatasetSchema.parse(json);
        Object.entries(typedData).map((elem) => {
          dataArray.push({
            name: elem[0],
            iso_code: elem[1].iso_code,
            data: elem[1].data,
          });
        });
        return dataArray;
      })
      .catch(() => {
        throw new Error('Data with the wrong type was received!');
      });
  }
  return dataPromise;
}
