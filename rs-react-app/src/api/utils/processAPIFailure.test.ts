import { processAPIFailure } from './processAPIFailure';

describe('processAPIFailure', () => {
  const returnResponse = (status: number) => {
    return new Response(null, { status: status });
  };

  it(`should throw correct error for response with 404 status`, async () => {
    const response = returnResponse(404);

    expect(() => processAPIFailure(response)).toThrowError(
      new Error(
        `The requested resource is not found. Status code: ${response.status}`
      )
    );
  });
  it(`should throw correct error for response with 503 status`, async () => {
    const response = returnResponse(503);

    expect(() => processAPIFailure(response)).toThrowError(
      new Error(
        `The server is unavailable now. Try again later. Status code: ${response.status}`
      )
    );
  });
  it(`should throw correct error for response with 500 status`, async () => {
    const response = returnResponse(500);

    expect(() => processAPIFailure(response)).toThrowError(
      new Error(
        `This is a server-side problem. Status code: ${response.status}`
      )
    );
  });
  it(`should throw correct error for response with 400 status`, async () => {
    const response = returnResponse(400);

    expect(() => processAPIFailure(response)).toThrowError(
      new Error(
        `This is a client-side problem. Status code: ${response.status}`
      )
    );
  });
  it(`should throw correct error for response with 300 status`, async () => {
    const response = returnResponse(300);

    expect(() => processAPIFailure(response)).toThrowError(
      new Error(`Status code: ${response.status}`)
    );
  });
});
