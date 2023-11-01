import { Bot } from './bot';
import { environment } from './environment';
import { Events } from '@toxictoast/shared';

const bot = new Bot({
  logging: true,
  authentication: {
    user_id: environment.user_id,
    client_id: environment.client_id,
    client_secret: environment.client_secret,
    access_token: environment.access_token,
    refresh_token: environment.refresh_token,
  },
  channels: environment.channels,
});

bot.addPlugin({
  name: 'JoinLogger',
  event: Events.JOIN,
  execute: (data) => {
    console.log(data);
  },
});
bot.addPlugin({
  name: 'PartLogger',
  event: Events.PART,
  execute: (data) => {
    console.log(data);
  },
});

bot.init();
