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
  LoadPluginHelper,
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
    LoadPluginHelper(this.chatProvider, this.logProvider, plugin);
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
        `(${plugin.name})`,
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
