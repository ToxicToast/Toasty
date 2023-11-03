import { Message, Plugin } from '../interfaces';
import {
  JoinData,
  JoinEvent,
  PartData,
  PartEvent,
  MessageData,
  MessageEvent,
  TimeoutData,
  TimeoutEvent,
} from '../events';
import { ChatClient } from '@twurple/chat';
import { Logger } from '../classes';

export function LoadPluginHelper<Type>(
  chatProvider: ChatClient,
  logProvider: Logger,
  plugin: Plugin<Type>,
): void {
  const { event, init, execute } = plugin;

  if (init) {
    init();
  }

  if (execute) {
    if (event === 'join') {
      const joinPlugin = plugin as Plugin<JoinData>;
      JoinEvent(chatProvider, joinPlugin.execute);
    } else if (event === 'part') {
      const partPlugin = plugin as Plugin<PartData>;
      PartEvent(chatProvider, partPlugin.execute);
    } else if (event === 'message') {
      const messagePlugin = plugin as Plugin<MessageData, Message>;
      MessageEvent(chatProvider, messagePlugin.execute);
    } else if (event === 'timeout') {
      const timeoutPlugin = plugin as Plugin<TimeoutData>;
      TimeoutEvent(chatProvider, timeoutPlugin.execute);
    } else {
      logProvider.error(`Event ${event} not found`);
    }
  }
}
