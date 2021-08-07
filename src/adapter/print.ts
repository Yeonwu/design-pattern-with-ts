export class PrintString {
    constructor(
        private str: string
    ){}
    showWithParen():void {
        console.log(`(${this.str})`);
    }
    showWithAter():void {
        console.log(`*${this.str}*`);
    }
}