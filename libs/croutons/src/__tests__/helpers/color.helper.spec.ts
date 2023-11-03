import { ColorHelper } from '../../lib/helpers/color.helper';
import { ChatMessage, ChatUser } from '@twurple/chat';

describe('Color Helper', () => {
  it('should return the color from the userInfo object when it exists', () => {
    const userInfo = { color: '#ff0000' } as ChatUser;
    const args = { userInfo } as ChatMessage;
    const result = ColorHelper(args);
    expect(result).toBe('#ff0000');
  });

  it('should return the default color when the userInfo object does not have a color property', () => {
    const userInfo = {} as ChatUser;
    const args = { userInfo } as ChatMessage;
    const result = ColorHelper(args);
    expect(result).toBe('#ffffff');
  });
});
