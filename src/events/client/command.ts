import { GuildMemberManager, Message } from 'discord.js';

import Bot from '../../structures/client';
import Event from '../../structures/event';
import ms from 'pretty-ms';

class Command extends Event {
  constructor(client: Bot) {
    super(client, {
      name: 'Command Event',
      emiter: 'messageCreate',
    });
  }

  async run(message: Message): Promise<void> {
    if (!message.guild || message.author.bot) return;

    const prefix = process.env.prefix;

    const { cprefix, guildPrefix } = this.client.util.prefixRegex(
      message.content,
      prefix
    );
    if (!cprefix) return;

    const [cmd, ...args] = message.content
      .slice(cprefix.length)
      .trim()
      .split(/ +/g);

    const command = this.client.commands[this.client.aliases[cmd] || cmd];
    if (!command) return;

    const { developer, userPermissions, botPermissioons } = command;

    const isDev = this.client.developers.includes(message.author.id);
    if (developer && !isDev) return;
    if (isDev) {
      command.load(message, args, guildPrefix).catch(er => this.client.logger.error(`Error while executing command ${command.name}`, er));
      return;
    }

    if (!this.client.cooldowns[command.aliases[0]])
      this.client.cooldowns[command.aliases[0]] = {};

    const commandCds = this.client.cooldowns[command.aliases[0]];
    const userCd = commandCds[message.author.id];

    if (userCd) {
      const cdLeft = userCd + command.cooldown - Date.now();
      if (cdLeft > 0) {
        message.reply(
          `Please wait ${ms(cdLeft)} before running \`${cmd}\` again`
        );
        return;
      }
    }

    if (
      userPermissions.length &&
      !message.member.permissions.has(userPermissions)
    ) {
      message.reply('You don\'t have enough permission to run this command');
      return;
    }

    if (
      botPermissioons.length &&
      !(message.guild.members as GuildMemberManager).me.permissions.has(botPermissioons)
    ) {
      message.reply(
        `Looks like i don't have enough permission to run this command, please make sure i have theese permissions \`${botPermissioons.join(
          ', '
        )}\``
      );
      return;
    }

    command.load(message, args, guildPrefix).catch(er => this.client.logger.error(`Error while executing command ${command.name}`, er));
  }
}

export default Command;
