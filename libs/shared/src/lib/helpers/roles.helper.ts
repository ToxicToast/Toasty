import { ChatMessage } from '@twurple/chat';
import { Roles } from '../enums';

export function RolesHelper(args: ChatMessage): Array<Roles> {
  const { isFirst, userInfo, isReturningChatter } = args;
  const roles: Array<Roles> = [Roles.VIEWER];
  //
  const { isSubscriber, isVip, isMod, isBroadcaster } = userInfo;
  //
  if (isFirst) {
    roles.push(Roles.FIRST);
  }
  if (isReturningChatter) {
    roles.push(Roles.RETURNING);
  }
  if (isSubscriber) {
    roles.push(Roles.SUBSCRIBER);
  }
  if (isVip) {
    roles.push(Roles.VIP);
  }
  if (isMod) {
    roles.push(Roles.MODERATOR);
  }
  if (isBroadcaster) {
    roles.push(Roles.BROADCASTER);
  }
  return roles;
}
