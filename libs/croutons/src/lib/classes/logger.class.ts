export class Logger {
  private readonly logger = console;
  private readonly prefix = '[Toasty]';
  private readonly suffix = '🍞';
  private readonly isActive: boolean = false;

  constructor(isActive: boolean) {
    this.isActive = isActive;
  }

  public log(...args: Array<unknown>): void {
    if (this.isActive) {
      this.logger.log(this.prefix, this.suffix, ...args);
    }
  }

  public debug(...args: Array<unknown>): void {
    if (this.isActive) {
      this.logger.debug(this.prefix, this.suffix, ...args);
    }
  }

  public error(...args: Array<unknown>): void {
    if (this.isActive) {
      this.logger.error(this.prefix, this.suffix, ...args);
    }
  }
}
