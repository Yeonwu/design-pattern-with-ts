import { Display } from "./display";
export class CharDisplay extends Display {
  private ch: string;
  constructor(ch: string) {
    super();
    this.ch = ch;
  }
  protected didOpen(): void {
    process.stdout.write("<<");
  }
  protected print(): void {
    process.stdout.write(this.ch);
  }
  protected willClose(): void {
    process.stdout.write(">>\n");
  }
}
