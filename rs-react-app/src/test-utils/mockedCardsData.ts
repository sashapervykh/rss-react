export const mockedSimpleRequestResult = [
  {
    title: 'Testing image',
    description: 'Testing data for request',
    media_type: 'image',
    source: 'test.com',
  },
];

export const mockedRequestResultWithoutDescription = [
  {
    title: 'Testing image',
    description: `NASA did not provide any description for this item(((`,
    media_type: 'video',
    source: 'test.com',
  },
];

export const mockedEmptyRequestResult = [
  {
    title: 'Testing image',
    description: `Data for empty request`,
    media_type: 'audio',
    source: 'test.com',
  },
];
