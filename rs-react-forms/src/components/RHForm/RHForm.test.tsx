import { render } from '@testing-library/react';

import { testForm } from '../../test-utils/testForm';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { RHForm } from './RHForm';

describe('ValidationError', () => {
  it(`should render paragraph with the given text`, () => {
    render(
      <Provider store={setupStore()}>
        <RHForm />
      </Provider>
    );

    testForm({ saveButtonDisabled: true });
  });
});
