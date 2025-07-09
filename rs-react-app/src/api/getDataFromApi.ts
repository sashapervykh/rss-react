import { z } from 'zod/v4';

interface Props {
  input: string;
  page?: number;
}

export interface SearchResultType {
  title: string;
  description: string;
  image_url: string;
}

const APIDataSchema = z.object({
  collection: z.object({
    href: z.string(),
    items: z.array(
      z.object({
        data: z.array(
          z.object({
            center: z.string().optional(),
            date_created: z.string(),
            description: z.string(),
            keywords: z.array(z.string()).optional(),
            media_type: z.enum(['image', 'audio', 'video']),
            nasa_id: z.string().optional(),
            title: z.string(),
          })
        ),
        href: z.string().optional(),
        links: z.array(
          z.object({
            href: z.string(),
            rel: z.string(),
            render: z.string().optional(),
          })
        ),
      })
    ),
    links: z
      .array(
        z.object({ href: z.string(), rel: z.string(), prompt: z.string() })
      )
      .optional(),
    metadata: z.object({ total_hits: z.number() }),
    version: z.string().optional(),
  }),
});

export async function getDataFromApi({ input, page = 1 }: Props) {
  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${input}&page=${page.toString()}&page_size=10`
    );
    const body = await response.json();
    console.log(body);
    const typedBody = APIDataSchema.parse(body);
    const searchResult = typedBody.collection.items.map((element) => {
      return {
        title: element.data[0].title,
        description: element.data[0].description,
        image_url: element.links[0].href,
      };
    });
    return searchResult;
  } catch (error) {
    console.error(error);
  }
}
