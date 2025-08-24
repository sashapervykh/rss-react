import { render, screen, within } from '@testing-library/react';

import { testForm } from '../../test-utils/testForm';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { RHForm } from './RHForm';
import { fillFormCorrectly } from '../../test-utils/fillForm';
import { ModalProvider } from '../../hooks/useModal/ModalProvider';
import { ButtonsWrapper } from '../ButtonsWrapper/ButtonsWrapper';
import userEvent from '@testing-library/user-event';
import { DataWithRealFile } from '../../test-utils/mockedData';

describe('RHF Form', () => {
  it(`should render paragraph with the given text`, () => {
    render(
      <Provider store={setupStore()}>
        <RHForm />
      </Provider>
    );

    testForm({ saveButtonDisabled: true });
  });

  it(`should enable save button after filling the form correctly paragraph with the given text`, async () => {
    render(
      <Provider store={setupStore()}>
        <RHForm />
      </Provider>
    );

    await fillFormCorrectly();

    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeEnabled();
  });
  it(`should save data by save button click`, async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <ModalProvider>
          <ButtonsWrapper />
        </ModalProvider>
      </Provider>
    );

    const rhfButton = screen.getByRole('button', { name: 'RHF Form' });
    await userEvent.click(rhfButton);
    const form = await screen.findByTestId('rhf');
    expect(form).toBeInTheDocument();

    await fillFormCorrectly();

    const saveButton = within(form).getByText('Save');
    await userEvent.click(saveButton);
    expect(form).not.toBeInTheDocument();

    expect(store.getState().personsReducer.rhfData).toEqual(
      await DataWithRealFile()
    );
  });
});
