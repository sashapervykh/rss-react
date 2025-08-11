import NO_IMAGE from '/no_image_available.png?url';

import { type APIResponseType } from './types';

export function processSearchResponse(response: APIResponseType) {
  const maxPage = Math.ceil(response.collection.metadata.total_hits / 10);
  const searchResult = response.collection.items.map((element) => {
    return {
      title: element.data[0].title,
      description:
        element.data[0].description ??
        `NASA did not provide any description for this item(((`,
      media_type: element.data[0].media_type,
      source: element.links ? element.links[0].href : NO_IMAGE,
      nasa_id: element.data[0].nasa_id,
    };
  });
  return { max: maxPage, results: searchResult };
}
