import { ChatClient, ChatMessage } from '@twurple/chat';
import { Message } from '../interfaces';
import { MessageHelper } from '../helpers';

export type MessageData = {
  channel: string;
  username: string;
  message: string;
  args: ChatMessage;
};

export function MessageEvent(
  client: ChatClient,
  callback: (raw: MessageData, formatted: Message) => void,
): void {
  client.onMessage(
    (channel: string, username: string, message: string, args: ChatMessage) =>
      callback(
        { channel, username, message, args },
        MessageHelper(channel, username, message, args),
      ),
  );
}
