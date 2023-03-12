import Bot from '../structures/client';

class CommonUtil {
  client: Bot;
  constructor(client: Bot) {
    this.client = client;
  }

  prefixRegex(message: string, prefix: string) {
    const clientName = new RegExp('\\w+').exec(this.client.user.username);
    const guildPrefix = prefix || process.env.prefix;
    const regex = new RegExp(
      `^(<@!?${this.client.user.id}>|${this.escapeRegex(
        clientName[0]
      )}|${this.escapeRegex(guildPrefix)})\\s*`,
      'i'
    );

    const prefixRegex = message.match(regex);
    const cprefix = prefixRegex ? prefixRegex[1] : '';
    return { cprefix, guildPrefix };
  }

  escapeRegex(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

export default CommonUtil;
