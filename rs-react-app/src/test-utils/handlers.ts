import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://images-api.nasa.gov/search', ({ request }) => {
    const url = new URL(request.url);
    const requestedTerm = url.searchParams.get('q');

    switch (requestedTerm) {
      case 'simpleRequest': {
        return HttpResponse.json(
          returnMockResponses({
            description: 'Testing data for request',
            links: 'test.com',
            repeats: 1,
            media_type: 'image',
          })
        );
      }
      case 'without description': {
        return HttpResponse.json(
          returnMockResponses({
            links: 'test.com',
            repeats: 1,
            media_type: 'video',
          })
        );
      }
      case 'not found': {
        return new HttpResponse(null, { status: 404 });
      }
      case 'unavailable server': {
        return new HttpResponse(null, { status: 503 });
      }
      case 'server error': {
        return new HttpResponse(null, { status: 504 });
      }
      case 'client error': {
        return new HttpResponse(null, { status: 403 });
      }
      case null: {
        return HttpResponse.json(
          returnMockResponses({
            description: 'Data for empty request',
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
  description,
  links,
  repeats = 1,
  media_type,
}: {
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
          title: 'Testing image',
        },
      ],
      links: [{ href: links }],
    });
  }

  return {
    collection: {
      items: items,
    },
  };
}
