import { http, HttpResponse } from 'msw';
import { TEST_REQUESTS } from './mockedCardsData';

export const handlers = [
  http.get('https://images-api.nasa.gov/search', ({ request }) => {
    const url = new URL(request.url);
    const requestedTerm = url.searchParams.get('q');
    const requestedID = url.searchParams.get('nasa_id');

    if (requestedID) {
      switch (requestedID) {
        case TEST_REQUESTS.simple: {
          return HttpResponse.json(
            returnMockResponses({
              title: TEST_REQUESTS.simple,
              description: `Testing data for ${TEST_REQUESTS.simple}`,
              links: 'test.jpg',
              repeats: 1,
              media_type: 'image',
            })
          );
        }
        case TEST_REQUESTS.withoutSource: {
          return HttpResponse.json(
            returnMockResponses({
              title: TEST_REQUESTS.withoutSource,
              description: `Testing data for ${TEST_REQUESTS.withoutSource}`,
              repeats: 1,
              media_type: 'video',
            })
          );
        }
      }
    }

    switch (requestedTerm) {
      case TEST_REQUESTS.simple: {
        return HttpResponse.json(
          returnMockResponses({
            title: TEST_REQUESTS.simple,
            description: `Testing data for ${TEST_REQUESTS.simple}`,
            links: 'test.jpg',
            repeats: 1,
            media_type: 'image',
          })
        );
      }
      case TEST_REQUESTS.withoutDescription: {
        return HttpResponse.json(
          returnMockResponses({
            title: TEST_REQUESTS.withoutDescription,
            links: 'test.jpg',
            repeats: 1,
            media_type: 'video',
          })
        );
      }
      case TEST_REQUESTS.notFound: {
        return new HttpResponse(null, { status: 404 });
      }
      case TEST_REQUESTS.unavailableServer: {
        return new HttpResponse(null, { status: 503 });
      }
      case TEST_REQUESTS.serverError: {
        return new HttpResponse(null, { status: 504 });
      }
      case TEST_REQUESTS.clientError: {
        return new HttpResponse(null, { status: 403 });
      }
      case null: {
        return HttpResponse.json(
          returnMockResponses({
            title: TEST_REQUESTS.empty,
            description: `Testing data for ${TEST_REQUESTS.empty}`,
            links: 'test.jpg',
            repeats: 1,
            media_type: 'audio',
          })
        );
      }
    }
  }),
];

function returnMockResponses({
  title,
  description,
  links,
  repeats = 1,
  media_type,
}: {
  title: string;
  description?: string;
  links?: string;
  repeats: number;
  media_type: 'image' | 'video' | 'audio';
}) {
  const items = [];
  for (let i = 0; i < repeats; i++) {
    items.push(
      links
        ? {
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
      metadata: { total_hits: items.length },
    },
  };
}
