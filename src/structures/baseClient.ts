import { Client, IntentsBitField } from 'discord.js';

import Logger from '../utils/logger';
import Loader from '../utils/loader';
import Command from './command';
import Event from './event';
import CommonUtil from '../utils/common';
import { OpenAIApi } from 'openai';

class BaseClient extends Client {
  developers: string[];
  logger: Logger;
  commands: Record<string, Command>;
  aliases: Record<string, string>;
  cooldowns: Record<string, Record<string, number>>;
  events: Record<string, Event>;
  loader: Loader;
  util: CommonUtil;
  ai: OpenAIApi;

  constructor() {
    super({
      intents: [IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.Guilds],
    });
  }

  async init() {
    this.login();
  }
}

export default BaseClient;
