import { ChatMessage } from '@twurple/chat';
import { RolesHelper } from './roles.helper';
import { ColorHelper } from './color.helper';
import { Message } from '../interfaces';

export function MessageHelper(
  channel: string,
  username: string,
  message: string,
  args: ChatMessage,
): Message {
  const roles = RolesHelper(args);
  const color = ColorHelper(args);
  //
  return {
    channel,
    username,
    message,
    roles,
    color,
  };
}
