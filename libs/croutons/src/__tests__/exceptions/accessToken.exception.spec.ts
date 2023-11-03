import { AccessTokenException } from '../../lib/exceptions/accessToken.exception';

describe('Access Token Exception', () => {
  it('should throw an error with specific message when called', () => {
    expect(() => {
      AccessTokenException();
    }).toThrowError('[Toasty Exception] No AccessToken Provided');
  });
});
