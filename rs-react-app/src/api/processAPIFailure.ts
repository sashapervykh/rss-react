export function processAPIFailure(response: Response) {
  if (!response.ok) {
    switch (true) {
      case response.status === 404: {
        throw new Error(
          `The requested resource is not found. Status code: ${response.status}`
        );
      }
      case response.status === 503: {
        throw new Error(
          `The server is unavailable now. Try again later. Status code: ${response.status}`
        );
      }
      case response.status >= 500: {
        throw new Error(
          `This is a server-side problem. Status code: ${response.status}`
        );
      }
      case response.status >= 400: {
        throw new Error(
          `This is a client-side problem. Status code: ${response.status}`
        );
      }
      default: {
        throw new Error(`Status code: ${response.status}`);
      }
    }
  }
}
