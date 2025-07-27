import { processAPIFailure } from './processAPIFailure';
import { APIDataScheme, errorScheme } from './types';

export async function getOneAssetFromApi(id: string) {
  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?nasa_id=${id}`
    );

    processAPIFailure(response);

    const body = await response.json();

    const typedBody = APIDataScheme.parse(body);

    return {
      title: typedBody.collection.items[0].data[0].title,
      description:
        typedBody.collection.items[0].data[0].description ??
        `NASA did not provide any description for this item(((`,
      media_type: typedBody.collection.items[0].data[0].media_type,
      source: typedBody.collection.items[0].links
        ? typedBody.collection.items[0].links[0].href
        : undefined,
      keywords: typedBody.collection.items[0].data[0].keywords ?? [
        'No keywords were provided',
      ],
    };
  } catch (error) {
    const message = errorScheme.parse(error).message;
    throw new Error(
      `There is a problem with API response. ${message ? message : ''}`
    );
  }
}
