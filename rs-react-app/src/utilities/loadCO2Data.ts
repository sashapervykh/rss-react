import type { z } from 'zod/v4';
import { DataSchema } from '../models/schema';

let dataPromise: Promise<z.infer<typeof DataSchema>>;

export function loadCO2Data() {
  if (!dataPromise) {
    dataPromise = fetch('/co2-data.json')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const typedData = DataSchema.parse(json);
        return typedData;
      })
      .catch(() => {
        throw new Error('Data with the wrong type was received!');
      });
  }
  return dataPromise;
}
