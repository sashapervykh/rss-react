import { http, HttpResponse } from 'msw';
import { TEST_REQUESTS } from './mockedCardsData';

export const handlers = [
  http.get('https://images-api.nasa.gov/search', ({ request }) => {
    const url = new URL(request.url);
    const requestedTerm = url.searchParams.get('q');

    switch (requestedTerm) {
      case TEST_REQUESTS.simple: {
        return HttpResponse.json(
          returnMockResponses({
            title: TEST_REQUESTS.simple,
            description: `Testing data for ${TEST_REQUESTS.simple}`,
            links: 'test.com',
            repeats: 1,
            media_type: 'image',
          })
        );
      }
      case TEST_REQUESTS.withoutDescription: {
        return HttpResponse.json(
          returnMockResponses({
            title: TEST_REQUESTS.withoutDescription,
            links: 'test.com',
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
            links: 'test.com',
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
    items.push({
      data: [
        {
          description:
            description ??
            `NASA did not provide any description for this item(((`,
          media_type: media_type,
          title: title,
          nasa_id: title,
        },
      ],
      links: [{ href: links }],
    });
  }

  return {
    collection: {
      items: items,
      metadata: { total_hits: items.length },
    },
  };
}
