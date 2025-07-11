import { z } from 'zod/v4';

interface Props {
  input: string;
  page?: number;
}

export interface SearchResultType {
  title: string;
  description: string;
  source?: string;
  media_type: string;
}

const APIDataSchema = z.looseObject({
  collection: z.looseObject({
    items: z.array(
      z.looseObject({
        data: z.array(
          z.looseObject({
            description: z.string().optional(),
            keywords: z.array(z.string()).optional(),
            media_type: z.enum(['image', 'audio', 'video']),
            title: z.string(),
          })
        ),
        links: z.array(z.looseObject({ href: z.string() })),
      })
    ),
  }),
});

export async function getDataFromApi({ input, page = 1 }: Props) {
  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${input}&page=${page.toString()}&page_size=10`
    );
    const body = await response.json();
    const typedBody = APIDataSchema.parse(body);
    const searchResult = typedBody.collection.items.map((element) => {
      return {
        title: element.data[0].title,
        description:
          element.data[0].description ??
          `NASA did not provide any description for this item(((`,
        media_type: element.data[0].media_type,
        source: element.links ? element.links[0].href : undefined,
      };
    });
    return searchResult;
  } catch {
    throw new Error('There is a problem with API response');
  }
}
