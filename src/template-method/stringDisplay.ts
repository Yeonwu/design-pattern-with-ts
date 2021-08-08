import { Display } from "./display";

export class StringDisplay extends Display {
    private str: string;
    constructor(str: string) {
      super();
      this.str = str;
    }
  protected didOpen(): void {
    this.printLine();
  }
  protected print(): void {
    process.stdout.write(`|${this.str}|\n`);
  }
  protected willClose(): void {
    this.printLine();
  }
  private printLine(): void {
      process.stdout.write('+');
      this.str.split('').forEach(() => {
          process.stdout.write('-');
      });
      process.stdout.write('+\n');
  }
}
