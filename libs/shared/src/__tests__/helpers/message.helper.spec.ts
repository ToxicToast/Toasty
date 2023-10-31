import { MessageHelper } from '../../lib/helpers/message.helper';
import { Roles } from '../../lib/enums/roles.enum';
import { ChatMessage } from '@twurple/chat';

describe('Message Helper', () => {
  it('should return a Message object with the expected properties when given valid input arguments', () => {
    const channel = 'testChannel';
    const username = 'testUser';
    const message = 'testMessage';
    const args = {
      isFirst: true,
      userInfo: {
        isSubscriber: true,
        isVip: false,
        isMod: false,
        isBroadcaster: true,
        color: '#ff0000',
      },
      isReturningChatter: false,
    } as ChatMessage;
    const expectedRoles = [
      Roles.VIEWER,
      Roles.FIRST,
      Roles.SUBSCRIBER,
      Roles.BROADCASTER,
    ];
    const expectedColor = '#ff0000';
    const expectedMessage = {
      channel,
      username,
      message,
      roles: expectedRoles,
      color: expectedColor,
    };

    const result = MessageHelper(channel, username, message, args);

    expect(result).toEqual(expectedMessage);
  });
});
