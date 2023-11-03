import * as process from 'process';

export const environment = {
  user_id: process.env.TWITCH_USER_ID ?? '',
  client_id: process.env.TWITCH_CLIENT_ID ?? '',
  client_secret: process.env.TWITCH_CLIENT_SECRET ?? '',
  access_token: process.env.TWITCH_ACCESS_TOKEN ?? '',
  refresh_token: process.env.TWITCH_REFRESH_TOKEN ?? '',
  channels: process.env.TWITCH_CHANNELS?.split(',') ?? [],
};
