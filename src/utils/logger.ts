import chalk from 'chalk';
import moment from 'moment-timezone';

class Logger {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  info(message: string, ...data): void {
    this.log('info', [chalk`{blue [${this.name}-INFO]}`, message], ...data);
  }

  error(text: string, error?: Error, ...data): void {
    this.log(
      'error',
      [
        chalk`{red [${this.name}-ERROR]}`,
        `\n${text}${error ? chalk`\n{red [ERROR]} ${error.stack}` : ''}`,
      ],
      ...data
    );
  }

  warning(message: string, ...data): void {
    this.log('warn', [chalk`{yellowBright [WARNING]}`, message], ...data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private log(type: string, message: any[], ...data): void {
    const text = chalk`{yellow [${this.now}]}${message[0]} ${message[1]}`;
    console[type](text);

    for (const log of data) console[type](chalk`${message[0]}`, log);
  }

  get now() {
    return moment.tz('Asia/Jakarta').format('HH:MM:SS DD/MM/YYYY');
  }
}

export default Logger;
