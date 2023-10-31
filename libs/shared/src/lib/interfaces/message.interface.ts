import { Roles } from '../enums';

export interface Message {
  channel: string;
  username: string;
  message: string;
  roles: Array<Roles>;
  color: string;
}
