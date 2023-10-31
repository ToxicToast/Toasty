import { ChatMessage } from '@twurple/chat';

export function ColorHelper(args: ChatMessage): string {
  return args.userInfo.color ?? '#ffffff';
}
