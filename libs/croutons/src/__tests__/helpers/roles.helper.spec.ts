import { RolesHelper } from '../../lib/helpers/roles.helper';
import { Roles } from '../../lib/enums/roles.enum';
import { ChatMessage } from '@twurple/chat';

describe('Roles Helper', () => {
  it('should return an array containing the "viewer" role when no other roles are present', () => {
    const args = {
      isFirst: false,
      userInfo: {
        isSubscriber: false,
        isVip: false,
        isMod: false,
        isBroadcaster: false,
      },
      isReturningChatter: false,
    } as ChatMessage;
    const result = RolesHelper(args);
    expect(result).toEqual([Roles.VIEWER]);
  });

  it('should return an array containing the "first" role when the "isFirst" property is true', () => {
    const args = {
      isFirst: true,
      userInfo: {
        isSubscriber: false,
        isVip: false,
        isMod: false,
        isBroadcaster: false,
      },
      isReturningChatter: false,
    } as ChatMessage;
    const result = RolesHelper(args);
    expect(result).toEqual([Roles.VIEWER, Roles.FIRST]);
  });

  it('should return an array containing only the "viewer" role when all properties are false', () => {
    const args = {
      isFirst: false,
      userInfo: {
        isSubscriber: false,
        isVip: false,
        isMod: false,
        isBroadcaster: false,
      },
      isReturningChatter: false,
    } as ChatMessage;
    const result = RolesHelper(args);
    expect(result).toEqual([Roles.VIEWER]);
  });

  it('should return an array containing all roles when all properties are true', () => {
    const args = {
      isFirst: true,
      userInfo: {
        isSubscriber: true,
        isVip: true,
        isMod: true,
        isBroadcaster: true,
      },
      isReturningChatter: true,
    } as ChatMessage;
    const result = RolesHelper(args);
    expect(result).toEqual([
      Roles.VIEWER,
      Roles.FIRST,
      Roles.RETURNING,
      Roles.SUBSCRIBER,
      Roles.VIP,
      Roles.MODERATOR,
      Roles.BROADCASTER,
    ]);
  });
});
