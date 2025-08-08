import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import App from '../../App';
import { setupStore } from '../../store/store';
import { BuggyComponent } from '../../test-utils/BuggyComponent';
import { expectFallbackUI } from '../../test-utils/expectFallbackUI';
import { TEST_REQUESTS } from '../../test-utils/mockedCardsData';

import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it(`should catch Error and display fallback UI`, () => {
    render(
      <ErrorBoundary>
        <BuggyComponent isError={true} />
      </ErrorBoundary>
    );

    expectFallbackUI('Throwing error to test ErrorBoundary');
  });
  it(`should call console.error when catch an error`, () => {
    render(
      <ErrorBoundary>
        <BuggyComponent isError={true} />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      new Error('Throwing error to test ErrorBoundary')
    );
  });
  it(`should show appropriate error messages for HTTP status code 404`, async () => {
    localStorage.setItem('input', TEST_REQUESTS.notFound);
    render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() =>
      expectFallbackUI('The requested resource is not found. Status code: 404')
    );
  });
  it(`should show appropriate error messages for HTTP status code 503`, async () => {
    localStorage.setItem('input', TEST_REQUESTS.unavailableServer);

    render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() =>
      expectFallbackUI(
        'The server is unavailable now. Try again later. Status code: 503'
      )
    );
  });
});
