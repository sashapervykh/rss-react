import { z } from 'zod/v4';

interface Props {
  input: string;
  page?: number;
}

export interface SearchResultType {
  title: string;
  description: string;
  source: string | undefined;
  media_type: 'audio' | 'image' | 'video';
}

export const errorScheme = z.looseObject({ message: z.string() });

const APIDataScheme = z.looseObject({
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
        links: z.array(z.looseObject({ href: z.string() })).optional(),
      })
    ),
    metadata: z.looseObject({ total_hits: z.number() }),
  }),
});

export async function getDataFromApi({ input = '', page = 1 }: Props) {
  try {
    const response =
      input !== ''
        ? await fetch(
            `https://images-api.nasa.gov/search?q=${input}&page=${page.toString()}&page_size=10`
          )
        : await fetch(
            `https://images-api.nasa.gov/search?media_type=image&page=${page.toString()}&page_size=10`
          );

    if (!response.ok) {
      switch (true) {
        case response.status === 404: {
          throw new Error(
            `The requested resource is not found. Status code: ${response.status}`
          );
        }
        case response.status === 503: {
          throw new Error(
            `The server is unavailable now. Try again later. Status code: ${response.status}`
          );
        }
        case response.status >= 500: {
          throw new Error(
            `This is a server-side problem. Status code: ${response.status}`
          );
        }
        case response.status >= 400: {
          throw new Error(
            `This is a client-side problem. Status code: ${response.status}`
          );
        }
        default: {
          throw new Error(`Status code: ${response.status}`);
        }
      }
    }

    const body = await response.json();

    const typedBody = APIDataScheme.parse(body);
    console.log(typedBody);
    const maxPage = Math.ceil(typedBody.collection.metadata.total_hits / 10);
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
    return { max: maxPage, results: searchResult };
  } catch (error) {
    const message = errorScheme.parse(error).message;
    throw new Error(
      `There is a problem with API response. ${message ? message : ''}`
    );
  }
}
