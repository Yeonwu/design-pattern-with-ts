import { Display } from './display';
import { CharDisplay } from './charDisplay';
import { StringDisplay } from './stringDisplay';

export const main = ():void => {
    var charDisplay: Display = new CharDisplay('C');
    charDisplay.display();

    var stringDisplay: Display = new StringDisplay('Hello World!!');
    stringDisplay.display();
}