import { render, screen } from '@testing-library/react';
import { MockedFlyoutRender } from '../../test-utils/MockedFlyoutRender';
import userEvent from '@testing-library/user-event';

describe('Flyout', () => {
  const renderFlyout = () => {
    render(<MockedFlyoutRender />);
  };

  const getTestingElements = async () => {
    const text = await screen.findByText('Selected items: 1');
    const unselectButton = await screen.findByRole('button', {
      name: 'Unselect all',
    });
    const downloadButton = await screen.findByRole('button', {
      name: 'Download',
    });
    return { text, unselectButton, downloadButton };
  };

  it(`should render with 1 item and two buttons`, async () => {
    renderFlyout();

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    const { text, unselectButton, downloadButton } = await getTestingElements();

    expect(text).toBeInTheDocument();
    expect(unselectButton).toBeInTheDocument();
    expect(downloadButton).toBeInTheDocument();
  });
  it(`should hide after unchecking`, async () => {
    renderFlyout();

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    const { text, unselectButton, downloadButton } = await getTestingElements();

    await userEvent.click(checkbox);

    expect(text).not.toBeInTheDocument();
    expect(unselectButton).not.toBeInTheDocument();
    expect(downloadButton).not.toBeInTheDocument();
  });
  it(`should hide after click by "Unselect all"`, async () => {
    renderFlyout();

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    const { text, unselectButton, downloadButton } = await getTestingElements();

    await userEvent.click(unselectButton);

    expect(text).not.toBeInTheDocument();
    expect(unselectButton).not.toBeInTheDocument();
    expect(downloadButton).not.toBeInTheDocument();
  });
  it(`should trigger download by click on "Download"`, async () => {
    renderFlyout();

    const mockCreateObjectURL = vi.fn();

    vi.stubGlobal('URL', {
      createObjectURL: mockCreateObjectURL,
      revokeObjectURL: vi.fn(),
    });

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    const { downloadButton } = await getTestingElements();

    await userEvent.click(downloadButton);

    expect(mockCreateObjectURL).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
