import { Message } from 'discord.js';

import Bot from '../structures/client';
import Command from '../structures/command';

class Hello extends Command {
  constructor(client: Bot) {
    super(client, {
      name: 'Hello',
      aliases: ['chat'],
    });
  }

  async run(
    message: Message,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [...args]: string[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    guildPrefix: string
  ): Promise<void> {
    await message.channel.sendTyping();

    const msg = args.join(' ');
    const complete = await this.client.ai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: msg }],
    });

    message.channel.send(complete.data.choices[0].message.content);
    return;
  }
}

export default Hello;
