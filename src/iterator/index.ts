import { BookShelf } from "./bookShelf";
import { MyIterator } from "./iterator";
import { Book } from "./book";

export const main = (): void => {
  var bookShelf: BookShelf = new BookShelf();
  bookShelf.addBook("Java 언어로 배우는 디자인 패턴 입문");
  bookShelf.addBook("Clean Code");
  bookShelf.addBook("월든");

  var iterator: MyIterator = bookShelf.getIterator();
  while (iterator.hasNext()) {
    var book: Book = iterator.next();
    console.log(book);
  }
};

export { MyIterator } from "./iterator";
export { Aggregation } from "./aggregation";
export { Book } from "./book";
export { BookShelf } from "./bookShelf";
export { BookIterator } from "./bookIterator";
