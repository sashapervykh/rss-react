import {
  mockedRequestResultWithoutDescription,
  mockedSimpleRequestResult,
} from '../test-utils/mockedCardsData';

import { createFileContent } from './createFileContent';

describe('createFileContent', () => {
  it(`should return correct string for one card`, async () => {
    expect(createFileContent([mockedSimpleRequestResult.results[0]])).toEqual(
      '"simple","Testing data for simple","image","test.jpg","simple"'
    );
  });
  it(`should return correct string for several cards`, async () => {
    expect(
      createFileContent([
        mockedSimpleRequestResult.results[0],
        mockedRequestResultWithoutDescription.results[0],
      ])
    ).toEqual(
      '"simple","Testing data for simple","image","test.jpg","simple"\n"without description","NASA did not provide any description for this item(((","video","test.jpg","without description"'
    );
  });
});
