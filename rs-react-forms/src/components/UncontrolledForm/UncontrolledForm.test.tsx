import { render } from '@testing-library/react';
import { UncontrolledForm } from './UncontrolledForm';
import { testForm } from '../../test-utils/testForm';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';

describe('ValidationError', () => {
  it(`should render paragraph with the given text`, () => {
    render(
      <Provider store={setupStore()}>
        <UncontrolledForm />
      </Provider>
    );

    testForm({});
  });
});
