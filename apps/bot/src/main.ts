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
    console.log(data, 'JOIN');
  },
});
bot.addPlugin({
  name: 'PartLogger',
  event: Events.PART,
  execute: (data) => {
    console.log(data, 'PART');
  },
});
bot.addPlugin({
  name: 'MessageLogger',
  event: Events.MESSAGE,
  execute: (_, formatted) => {
    console.log(formatted, 'MESSAGE');
  },
});
bot.addPlugin({
  name: 'TimeoutLogger',
  event: Events.TIMEOUT,
  execute: (data) => {
    console.log(data, 'TIMEOUT');
  },
});
bot.addPlugin({
  name: 'BanLogger',
  event: Events.BAN,
  execute: (data) => {
    console.log(data, 'BAN');
  },
});
bot.addPlugin({
  name: 'ActionLogger',
  event: Events.ACTION,
  execute: (data) => {
    console.log(data, 'ACTION');
  },
});
bot.addPlugin({
  name: 'AnnouncementLogger',
  event: Events.ANNOUNCEMENT,
  execute: (data) => {
    console.log(data, 'ANNOUNCEMENT');
  },
});
bot.addPlugin({
  name: 'AuthFailureLogger',
  event: Events.AUTHENTICATIONFAILURE,
  execute: (data) => {
    console.log(data, 'AUTHENTICATIONFAILURE');
  },
});
bot.addPlugin({
  name: 'AuthSuccessLogger',
  event: Events.AUTHENTICATIONSUCCESS,
  execute: (data) => {
    console.log(data, 'AUTHENTICATIONSUCCESS');
  },
});
bot.addPlugin({
  name: 'BitsBadgeUpgradeLogger',
  event: Events.BITSBADGEUPGRADE,
  execute: (data) => {
    console.log(data, 'BITSBADGEUPGRADE');
  },
});

bot.init();
