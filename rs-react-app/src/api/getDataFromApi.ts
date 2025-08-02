import { processAPIFailure } from './processAPIFailure';
import { APIDataScheme, errorScheme } from './types';
import NO_IMAGE from './../../public/no_image_available.png';

interface Props {
  input: string;
  page?: number;
}

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

    processAPIFailure(response);

    const body = await response.json();

    const typedBody = APIDataScheme.parse(body);

    const maxPage = Math.ceil(typedBody.collection.metadata.total_hits / 10);
    const searchResult = typedBody.collection.items.map((element) => {
      const title =
        element.data[0].title.length > 30
          ? element.data[0].title.substring(0, 30) + '...'
          : element.data[0].title;

      const description =
        element.data[0].description && element.data[0].description.length > 140
          ? element.data[0].description.substring(0, 140) + '...'
          : element.data[0].description;
      return {
        title: title,
        description:
          description ??
          element.data[0].description ??
          `NASA did not provide any description for this item(((`,
        media_type: element.data[0].media_type,
        source: element.links ? element.links[0].href : NO_IMAGE,
        nasa_id: element.data[0].nasa_id,
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
