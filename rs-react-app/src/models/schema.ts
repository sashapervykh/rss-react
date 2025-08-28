import z from 'zod/v4';

export const DataSchema = z.record(
  z.string(),
  z.object({
    iso_code: z.string().optional(),
    data: z.array(
      z.looseObject({
        year: z.number(),
        cement_co2: z.number().optional(),
        cumulative_cement_co2: z.number().optional(),
        population: z.number().optional(),
        cement_co2_per_capita: z.number().optional(),
        methane: z.number().optional(),
        co2: z.number().optional(),
        co2_per_capita: z.number().optional(),
        coal_co2: z.number().optional(),
        coal_co2_per_capita: z.number().optional(),
        cumulative_co2: z.number().optional(),
        flaring_co2: z.number().optional(),
        flaring_co2_per_capita: z.number().optional(),
        ghg_per_capita: z.number().optional(),
        land_use_change_co2: z.number().optional(),
        land_use_change_co2_per_capita: z.number().optional(),
        methane_per_capita: z.number().optional(),
        nitrous_oxide: z.number().optional(),
        nitrous_oxide_per_capita: z.number().optional(),
        oil_co2: z.number().optional(),
        oil_co2_per_capita: z.number().optional(),
      })
    ),
  })
);

export type DisplayedDataType = z.infer<typeof DataSchema>;
