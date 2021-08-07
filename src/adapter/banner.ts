import { PrintBanner, PrintString } from ".";

export class Banner implements PrintBanner {
    public printWeak(str: string): void {
        var printString: PrintString = new PrintString(str);
        printString.showWithParen();
    }
    public printStrong(str: string): void {
        var printString: PrintString = new PrintString(str);
        printString.showWithAter();
    }

}