import { AccessToken, RefreshingAuthProvider } from '@twurple/auth';
import {
  AccessTokenException,
  Authentication,
  Logger,
  Nullable,
  RefreshException,
} from '@toxictoast/shared';

export class Auth {
  private readonly user_id: string;
  private logProvider: Logger;
  private authProvider: RefreshingAuthProvider;
  private access_token: Nullable<string>;
  private refresh_token: Nullable<string>;

  constructor(options: Authentication, logger: Logger) {
    this.access_token = options.access_token ?? null;
    this.refresh_token = options.refresh_token ?? null;
    this.user_id = options.user_id;
    //
    this.logProvider = logger;
    //
    this.init();
    this.addUser();
    this.onRefresh();
    this.onRefreshFailure();
  }

  private init(): void {
    if (this.access_token === null) {
      AccessTokenException();
    }
    if (this.refresh_token === null) {
      RefreshException();
    }
    this.authProvider = new RefreshingAuthProvider({
      clientId: process.env.TWITCH_CLIENT_ID ?? '',
      clientSecret: process.env.TWITCH_CLIENT_SECRET ?? '',
    });
  }

  private addUser(): void {
    this.authProvider.addUser(
      this.user_id,
      {
        accessToken: this.access_token ?? undefined,
        refreshToken: this.refresh_token ?? null,
        expiresIn: null,
        obtainmentTimestamp: Math.ceil(new Date().getTime() / 1000),
      },
      ['chat'],
    );
    this.logProvider.debug('Successfully authenticated');
  }

  private onRefresh(): void {
    this.authProvider.onRefresh((userId: string, tokenData: AccessToken) => {
      this.logProvider.debug('Refreshing access token for user', userId);
      this.access_token = tokenData.accessToken ?? null;
      this.refresh_token = tokenData.refreshToken ?? null;
    });
  }

  private onRefreshFailure(): void {
    this.authProvider.onRefreshFailure(() => {
      RefreshException();
    });
  }

  get instance(): RefreshingAuthProvider {
    return this.authProvider;
  }
}
