import { MyIterator, Aggregation, Book, BookIterator } from ".";

/**
 * Aggregation 구현한 객체.
 */

export class BookShelf implements Aggregation {
    // 데이터 저장할 배열.
    private books: Array<Book>;
    constructor (){
        this.books = [];
    }
    // iterator 셍성.
    getIterator(): MyIterator {
        return new BookIterator(this);
    }
    // 배열 길이.
    getLength(): number {
        return this.books.length;
    }
    // index로 배열 참조.
    getBookAt(index: number):Book {
        return this.books[index];
    }
    // 책 추가
    addBook(title: string) {
        this.books.push(new Book(title));
    }
}