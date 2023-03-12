import { CommandOptions } from './interfaces/command';

import Bot from './client';
import { Message, EmbedBuilder, PermissionsString } from 'discord.js';

class Command {
  client: Bot;
  name: string;
  aliases: string[];
  userPermissions: PermissionsString[];
  botPermissioons: PermissionsString[];
  description: string[];
  developer: boolean;
  cooldown: number;
  disable: boolean;

  constructor(client: Bot, opt: CommandOptions) {
    this.client = client;
    this.name = opt.name;
    this.aliases = opt.aliases;
    this.userPermissions = opt.userPermissions || [];
    this.botPermissioons = opt.botPermissions || [];
    this.description = opt.description || ['No Description Provided'];
    this.developer = opt.developer || false;
    this.cooldown = (opt.cooldown || 5) * 1000;
    this.disable = opt.disable || false;
  }

  async load(message: Message, args: string[], guildPrefix: string) {
    const res = await this.run(message, args, guildPrefix).catch(
      (er: Error) => er
    );

    if (res instanceof Error) return this.commandError(message, res);

    if (!this.client.developers.includes(message.author.id)) {
      this.client.commands[this.aliases[0]][message.author.id] = Date.now();
      setTimeout(
        () => delete this.client[this.aliases[0][message.author.id]],
        this.cooldown
      );
    }
  }

  commandError(message: Message, err: Error) {
    this.client.logger.error(`Error while running ${this.name}`, err);
    const embed = new EmbedBuilder()
      .setDescription(
        'Ooops, an error occured while executing this command... please try again later.'
      )
      .setColor('Red');

    message.channel.send({
      embeds: [embed],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(message: Message, args: string[], guilPrefix: string) {
    throw new Error('Unimplementd run command function');
  }
}

export default Command;
