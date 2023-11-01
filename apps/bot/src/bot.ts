import { ChatClient } from '@twurple/chat';
import {
  Plugin,
  Option,
  Authentication,
  JoinEvent,
  PartEvent,
  MessageEvent,
  JoinData,
  PartData,
  MessageData,
} from '@toxictoast/shared';
import { Auth } from './auth';
import { Logger } from './logger';

export class Bot {
  private readonly channels: Array<string>;
  private readonly authentication: Authentication;
  private plugins: Array<Plugin<unknown>>;
  private logProvider: Logger;
  private authProvider: Auth;
  private chatProvider: ChatClient;

  constructor(private options: Option) {
    this.authentication = options.authentication;
    this.channels = options.channels;
    this.plugins = [];
    //
    this.initLogging();
    //
    this.initAuth();
    this.initChat();
  }

  private initLogging(): void {
    this.logProvider = new Logger(this.options.logging ?? false);
  }

  private initAuth(): void {
    this.authProvider = new Auth(this.authentication, this.logProvider);
  }

  private initChat(): void {
    this.chatProvider = new ChatClient({
      authProvider: this.authProvider.instance,
      channels: this.channels,
      requestMembershipEvents: true,
    });
  }

  private loadPlugin<Type>(plugin: Plugin<Type>): void {
    const { event, init, execute } = plugin;
    if (init) {
      init();
    }
    if (execute) {
      if (event === 'join') {
        const joinPlugin = plugin as Plugin<JoinData>;
        JoinEvent(this.chatProvider, joinPlugin.execute);
      } else if (event === 'part') {
        const partPlugin = plugin as Plugin<PartData>;
        PartEvent(this.chatProvider, partPlugin.execute);
      } else if (event === 'message') {
        const messagePlugin = plugin as Plugin<MessageData>;
        MessageEvent(this.chatProvider, messagePlugin.execute);
      } else {
        this.logProvider.error(`Event ${event} not found`);
      }
    }
  }

  public addPlugin<Type>(plugin: Plugin<Type>): Bot {
    this.plugins.push(plugin);
    return this;
  }

  public init(): Bot {
    this.logProvider.debug('Loading plugins...');
    this.plugins.forEach((plugin, index: number) => {
      this.logProvider.debug(
        'Loading plugin:',
        index + 1,
        '/',
        this.plugins.length,
      );
      this.loadPlugin(plugin);
    });
    this.logProvider.debug('Attempting to connect');
    this.chatProvider.connect();
    //
    this.chatProvider.onConnect(() => {
      this.logProvider.debug('Joining channels:', this.channels.join(', '));
      this.logProvider.debug('Successfully connected to Twitch Chat');
    });
    //
    return this;
  }
}
