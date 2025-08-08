import { type APIResponseType, type AssetType } from './types';

export function processDetailsResponse(response: APIResponseType): AssetType {
  return {
    title: response.collection.items[0].data[0].title,
    description:
      response.collection.items[0].data[0].description ??
      `NASA did not provide any description for this item(((`,
    media_type: response.collection.items[0].data[0].media_type,
    source: response.collection.items[0].links
      ? response.collection.items[0].links[0].href
      : undefined,
    keywords: response.collection.items[0].data[0].keywords ?? [
      'No keywords were provided',
    ],
  };
}
