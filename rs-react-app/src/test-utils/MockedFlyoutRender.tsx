import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { Card } from '../components/Card/Card';
import { Flyout } from '../components/Flyout/Flyout';
import { setupStore } from '../store/store';

import { mockedSimpleRequestResult } from './mockedCardsData';

export function MockedFlyoutRender() {
  return (
    <>
      <Provider store={setupStore()}>
        <MemoryRouter>
          <Card
            nasa_id={mockedSimpleRequestResult.results[0].nasa_id}
            description={mockedSimpleRequestResult.results[0].description}
            media_type={mockedSimpleRequestResult.results[0].media_type}
            source={mockedSimpleRequestResult.results[0].source}
            title={mockedSimpleRequestResult.results[0].title}
          />
          <Flyout />
        </MemoryRouter>
      </Provider>
    </>
  );
}
