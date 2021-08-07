import {Banner, PrintBanner} from '.';

export const main = (): void => {
    var banner: PrintBanner = new Banner();
    banner.printStrong('HELLO!');
    banner.printWeak('bye...');
}

export {PrintBanner} from './printBanner';
export {Banner} from './banner';
export {PrintString} from './print';