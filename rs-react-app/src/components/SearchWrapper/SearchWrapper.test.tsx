import { render, screen } from '@testing-library/react';
import {
  mockedEmptyRequestResult,
  mockedRequestResultWithoutDescription,
  mockedSimpleRequestResult,
  TEST_REQUESTS,
} from '../../test-utils/mockedCardsData';
import userEvent from '@testing-library/user-event';
import { getDataFromApi } from '../../api/getDataFromApi';
import { SearchWrapper } from './SearchWrapper';

describe('SearchWrapper', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mock('../../api/getDataFromApi', () => ({
      getDataFromApi: vi.fn(),
    }));
  });

  it(`should render search input with the saved term and results for this term`, async () => {
    localStorage.setItem('input', TEST_REQUESTS.withoutDescription);
    vi.mocked(getDataFromApi).mockResolvedValueOnce(
      mockedRequestResultWithoutDescription
    );
    render(<SearchWrapper />);

    const input = screen.getByRole('textbox');
    const card = await screen.findAllByTestId('card');
    const heading = await screen.findByRole('heading');

    expect(input).toBeInTheDocument();
    expect(card).toHaveLength(1);
    expect(heading).toHaveTextContent(TEST_REQUESTS.withoutDescription);
  });
  it(`should render correct results for the submitted input`, async () => {
    vi.mocked(getDataFromApi).mockResolvedValueOnce(
      mockedRequestResultWithoutDescription
    );
    render(<SearchWrapper />);

    vi.mocked(getDataFromApi).mockResolvedValueOnce(mockedSimpleRequestResult);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await userEvent.type(input, TEST_REQUESTS.simple);
    await userEvent.click(button);

    const card = await screen.findAllByTestId('card');
    const heading = await screen.findByRole('heading');

    expect(card).toHaveLength(1);
    expect(heading).toHaveTextContent(TEST_REQUESTS.simple);
  });
  it(`should shows loading state while fetching data`, async () => {
    vi.mocked(getDataFromApi).mockResolvedValue(mockedEmptyRequestResult);
    render(<SearchWrapper />);

    vi.mocked(getDataFromApi).mockImplementation(() => new Promise(() => {}));
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await userEvent.type(input, TEST_REQUESTS.simple);
    await userEvent.click(button);

    const spinner = await screen.findByTestId('spinner');

    expect(spinner).toBeInTheDocument();
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });
});
