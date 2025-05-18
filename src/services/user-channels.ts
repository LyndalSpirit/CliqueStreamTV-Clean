/**
 * Represents a user channel.
 */
export interface UserChannel {
  /**
   * The ID of the channel.
   */
  channelId: string;
  /**
   * The ID of the user who owns the channel.
   */
  userId: string;
  /**
   * The name of the channel.
   */
  channelName: string;
  /**
   * The description of the channel.
   */
  channelDescription: string;
}

/**
 * Creates a new channel for a user.
 * @param userId The ID of the user creating the channel.
 * @param channelName The name of the channel.
 * @param channelDescription A description of the channel.
 * @returns A promise that resolves to a UserChannel object.
 */
export async function createUserChannel(
  userId: string,
  channelName: string,
  channelDescription: string
): Promise<UserChannel> {
  // TODO: Implement this by calling an API.

  const channelId = Math.random().toString(36).substring(2, 15);

  return {
    channelId: channelId,
    userId: userId,
    channelName: channelName,
    channelDescription: channelDescription,
  };
}

/**
 * Retrieves a user's channels.
 * @param userId The ID of the user.
 * @returns A promise that resolves to an array of UserChannel objects.
 */
export async function getUserChannels(userId: string): Promise<UserChannel[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      channelId: 'channel1',
      userId: userId,
      channelName: 'My First Channel',
      channelDescription: 'A channel about my life.',
    },
    {
      channelId: 'channel2',
      userId: userId,
      channelName: 'My Second Channel',
      channelDescription: 'A channel about my hobbies.',
    },
  ];
}
