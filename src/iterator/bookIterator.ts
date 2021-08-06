import { MyIterator, BookShelf, Book } from ".";

// Iterator 구현함.
export class BookIterator implements MyIterator{
    // 반복에 사용할 카운터.
    private counter: number;
    // 생성자. 훑을 대상을 필드로 갖고 있음.
    constructor(
        private bookShelf: BookShelf
    ){
        this.counter = 0;
    }
    // 다음 대상이 있는지 확인.
    hasNext(): boolean {
        return this.counter < this.bookShelf.getLength();
    }
    // 다음 대상 가저오고 다음 순서로 이동.
    next(): Book {
        return this.bookShelf.getBookAt(this.counter++);
    }

}