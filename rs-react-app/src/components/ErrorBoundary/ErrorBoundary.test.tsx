import { render, waitFor } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { BuggyComponent } from '../../test-utils/BuggyComponent';
import { expectFallbackUI } from '../../test-utils/expectFallbackUI';
import App from '../../App';
import { getDataFromApi } from '../../api/getDataFromApi';

describe('ErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mock('../../api/getDataFromApi', () => ({
      getDataFromApi: vi.fn(),
      errorScheme: {
        parse: (error: { message: string }) => ({ message: error.message }),
      },
    }));
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
    vi.mocked(getDataFromApi).mockImplementation(() => {
      throw new Error('The requested resource is not found. Status code: 404');
    });

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    await waitFor(() =>
      expectFallbackUI('The requested resource is not found. Status code: 404')
    );
  });
  it(`should show appropriate error messages for HTTP status code 503`, async () => {
    vi.mocked(getDataFromApi).mockImplementation(() => {
      throw new Error(
        'The server is unavailable now. Try again later. Status code: 503'
      );
    });

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    await waitFor(() =>
      expectFallbackUI(
        'The server is unavailable now. Try again later. Status code: 503'
      )
    );
  });
});
