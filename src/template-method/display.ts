export abstract class Display {
  public readonly display = (): void => {};

  constructor() {
    this.display = (): void => {
      this.open();
      this.didOpen();
      for (var i = 0; i < 5; i++) {
        this.print();
      }
      this.willClose();
      this.close();
    };
  }
  protected abstract didOpen(): void;
  protected abstract print(): void;
  protected abstract willClose(): void;

  private open(): void {
    console.log("Opening Display...");
  }
  private close(): void {
    console.log("Closing Display...");
    console.log("Goodbye!");
  }
}