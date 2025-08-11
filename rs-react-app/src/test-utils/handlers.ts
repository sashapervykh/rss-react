import { delay, http, HttpResponse } from 'msw';

import { TEST_RESPONSES } from './mockedAPIResponses';
import { TEST_REQUESTS } from './mockedCardsData';

export const handlers = [
  http.get('https://images-api.nasa.gov/search', async ({ request }) => {
    const url = new URL(request.url);
    const requestedTerm = url.searchParams.get('q');
    const requestedID = url.searchParams.get('nasa_id');
    const requestedPage = url.searchParams.get('page');

    if (requestedID) {
      switch (requestedID) {
        case TEST_REQUESTS.simple: {
          return HttpResponse.json(TEST_RESPONSES.simple);
        }
        case TEST_REQUESTS.withoutSource: {
          return HttpResponse.json(TEST_RESPONSES.withoutSource);
        }
        case TEST_REQUESTS.delayed: {
          await delay(100);
          return HttpResponse.json(TEST_RESPONSES.delayed);
        }
        case TEST_REQUESTS.notFound: {
          return HttpResponse.json(null, { status: 404 });
        }
      }
    }

    switch (requestedTerm) {
      case TEST_REQUESTS.simple: {
        return HttpResponse.json(TEST_RESPONSES.simple);
      }
      case TEST_REQUESTS.withoutDescription: {
        return HttpResponse.json(TEST_RESPONSES.withoutSource);
      }
      case TEST_REQUESTS.severalResults: {
        return HttpResponse.json(TEST_RESPONSES.severalResults);
      }
      case TEST_REQUESTS.zeroResults: {
        return HttpResponse.json(TEST_RESPONSES.zeroResults);
      }
      case TEST_REQUESTS.notFound: {
        return new HttpResponse(null, { status: 404 });
      }
      case TEST_REQUESTS.delayed: {
        await delay(100);
        if (!(requestedPage === '2'))
          return HttpResponse.json(TEST_RESPONSES.delayed);
        return HttpResponse.json(TEST_RESPONSES.delayedSecondPage);
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
        return HttpResponse.json(TEST_RESPONSES.empty);
      }
    }
  }),
];
