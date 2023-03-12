import BaseClient from './baseClient';
import Logger from '../utils/logger';
import Loader from '../utils/loader';
import CommonUtil from '../utils/common';

class Bot extends BaseClient {
  constructor() {
    super();

    this.developers = JSON.parse(process.env.developers);
    this.logger = new Logger('BOT');
    this.loader = new Loader(this);
    this.util = new CommonUtil(this);
  }

  async init() {
    await this.loader.loadCommands();
    await this.loader.loadEvents();
    await this.loader.loadAi();

    this.login();
  }
}

export default Bot;
