import { RefreshException } from '../../lib/exceptions/refresh.exception';

describe('Refresh Exception', () => {
  it('should throw an error with specific message when called', () => {
    expect(() => {
      RefreshException();
    }).toThrowError('[Toasty Exception] Failed to Refresh Token');
  });
});
