/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventOptions } from './interfaces/event';
import { ClientEvents } from 'discord.js';

import Bot from './client';

class Event {
  client: Bot;
  name: string;
  emiter: keyof ClientEvents;
  disable: boolean;

  constructor(client: Bot, opt: EventOptions) {
    this.client = client;
    this.name = opt.name;
    this.emiter = opt.emiter;
    this.disable = opt.disable || false;
  }

  async load(...args: any) {
    this.run(...args).catch((er) => console.error(er));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(...args: any) {
    throw new Error('Unimplementd Run fucntion');
  }
}

export default Event;
