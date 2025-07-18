import { render } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { BuggyComponent } from '../../test-utils/BuggyComponent';
import { expectFallbackUI } from '../../test-utils/expectFallbackUI';

describe('ErrorBoundary', () => {
  it(`should catch Error and display fallback UI`, () => {
    render(
      <ErrorBoundary>
        <BuggyComponent isError={true} />
      </ErrorBoundary>
    );

    expectFallbackUI('Throwing error to test ErrorBoundary');
  });
});
