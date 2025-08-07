import { z } from 'zod/v4';

export interface AssetType {
  title: string;
  description: string;
  source: string | undefined;
  media_type: 'audio' | 'image' | 'video';
  keywords: string[];
}

export interface SearchData {
  max: number;
  results: SearchResultType[];
}

export interface SearchResultType {
  title: string;
  description: string;
  source: string;
  media_type: 'audio' | 'image' | 'video';
  nasa_id: string;
  [key: string]: string;
}

export const errorScheme = z.looseObject({ message: z.string() });

export const APIDataScheme = z.looseObject({
  collection: z.looseObject({
    items: z.array(
      z.looseObject({
        data: z.array(
          z.looseObject({
            description: z.string().optional(),
            keywords: z.array(z.string()).optional(),
            media_type: z.enum(['image', 'audio', 'video']),
            title: z.string(),
            nasa_id: z.string(),
          })
        ),
        links: z.array(z.looseObject({ href: z.string() })).optional(),
      })
    ),
    metadata: z.looseObject({ total_hits: z.number() }),
  }),
});
