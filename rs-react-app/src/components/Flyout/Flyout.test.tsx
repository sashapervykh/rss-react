import { render, screen } from '@testing-library/react';
import { MockedFlyoutRender } from '../../test-utils/MockedFlyoutRender';
import userEvent from '@testing-library/user-event';
import { getFlyoutElements } from '../../test-utils/getFlyoutElements';

describe('Flyout', () => {
  const renderFlyout = () => {
    render(<MockedFlyoutRender />);
  };

  it(`should render with 1 item and two buttons`, async () => {
    renderFlyout();

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    const { text, unselectButton, downloadButton } = await getFlyoutElements(1);

    expect(text).toBeInTheDocument();
    expect(unselectButton).toBeInTheDocument();
    expect(downloadButton).toBeInTheDocument();
  });
  it(`should hide after unchecking`, async () => {
    renderFlyout();

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    const { text, unselectButton, downloadButton } = await getFlyoutElements(1);

    await userEvent.click(checkbox);

    expect(text).not.toBeInTheDocument();
    expect(unselectButton).not.toBeInTheDocument();
    expect(downloadButton).not.toBeInTheDocument();
  });
  it(`should hide after click by "Unselect all"`, async () => {
    renderFlyout();

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    const { text, unselectButton, downloadButton } = await getFlyoutElements(1);

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

    const { downloadButton } = await getFlyoutElements(1);

    await userEvent.click(downloadButton);

    expect(mockCreateObjectURL).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
