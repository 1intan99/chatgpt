import Bot from '../../structures/client';
import Event from '../../structures/event';

class Ready extends Event {
  constructor(client: Bot) {
    super(client, {
      name: 'Ready',
      emiter: 'ready',
    });
  }

  async run(): Promise<void> {
    this.client.logger.info(`${this.client.user.tag} ready to serve.`);
  }
}

export default Ready;
