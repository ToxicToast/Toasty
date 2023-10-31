import { RefreshTokenException } from '../../lib/exceptions/refreshToken.exception';

describe('Refresh Token Exception', () => {
  it('should throw an error with specific message when called', () => {
    expect(() => {
      RefreshTokenException();
    }).toThrowError('[Toasty Exception] No RefreshToken Provided');
  });
});
