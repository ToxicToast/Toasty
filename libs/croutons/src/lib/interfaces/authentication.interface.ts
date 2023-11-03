import { Optional } from '../types';

export interface Authentication {
  user_id: string;
  client_id: string;
  client_secret: string;
  access_token?: Optional<string>;
  refresh_token?: Optional<string>;
}
