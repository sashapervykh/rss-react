import { render } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { BuggyComponent } from '../../test-utils/BuggyComponent';
import { expectFallbackUI } from '../../test-utils/expectFallbackUI';

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
});
