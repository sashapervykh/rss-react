import { TEST_REQUESTS } from './mockedCardsData';

const severalResults = returnMockResponses({
  title: TEST_REQUESTS.withoutDescription,
  links: 'test.jpg',
  repeats: 10,
  media_type: 'video',
  size: 20,
});

severalResults.collection.items.forEach((elem, index) => {
  elem.data[0] = {
    ...elem.data[0],
    nasa_id: elem.data[0].nasa_id + index.toString(),
  };
});

export const TEST_RESPONSES = {
  simple: returnMockResponses({
    title: TEST_REQUESTS.simple,
    description: `Testing data for ${TEST_REQUESTS.simple}`,
    links: 'test.jpg',
    repeats: 1,
    media_type: 'image',
  }),
  withoutSource: returnMockResponses({
    title: TEST_REQUESTS.withoutSource,
    description: `Testing data for ${TEST_REQUESTS.withoutSource}`,
    repeats: 1,
    media_type: 'video',
  }),
  severalResults: severalResults,
  empty: returnMockResponses({
    title: TEST_REQUESTS.empty,
    description: `Testing data for ${TEST_REQUESTS.empty}`,
    links: 'test.jpg',
    repeats: 1,
    media_type: 'audio',
  }),
  withoutDescription: returnMockResponses({
    title: TEST_REQUESTS.withoutDescription,
    links: 'test.jpg',
    repeats: 1,
    media_type: 'video',
  }),
  zeroResults: {
    collection: {
      items: [],
      metadata: { total_hits: 0 },
    },
  },
};

function returnMockResponses({
  title,
  description,
  links,
  repeats = 1,
  media_type,
  size,
}: {
  title: string;
  description?: string;
  links?: string;
  repeats: number;
  media_type: 'image' | 'video' | 'audio';
  size?: number;
}) {
  const items = [];
  for (let i = 0; i < repeats; i++) {
    items.push(
      links
        ? {
            data: [
              {
                description: description,
                media_type: media_type,
                title: title,
                nasa_id: title,
                keywords: [title],
              },
            ],
            links: [{ href: links }],
          }
        : {
            data: [
              {
                description:
                  description ??
                  `NASA did not provide any description for this item(((`,
                media_type: media_type,
                title: title,
                nasa_id: title,
                keywords: [title],
              },
            ],
          }
    );
  }

  return {
    collection: {
      items: items,
      metadata: { total_hits: size ?? items.length },
    },
  };
}
