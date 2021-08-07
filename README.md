# Design Pattern with Type Script

## 타입스크립트로 디자인 패턴 공부하기

다음 도서에 나오는 Java 코드를 Type Script로 재작성하며 공부한 내용 정리입니다.  
**개인적인 의견이 포함되어 있습니다.**

> Java 언어로 배우는 디자인 패턴 입문 <br>
> YUKI HIROSHI

## 목차

- [Chapter 01 Iterator](#chapter-01-iterator)
- [Chapter 02 Adapter](#chapter-02-adapter)

---

## Chapter 01 Iterator

### Iterator 패턴이란?

어떤 대상을 순서대로 지정하여 처리하는 디자인 패턴입니다.  
다음 코드를 추상화하였다고 생각하면 편합니다.

```javascript
for (var i = 0; i < n; i++) {
  var a = arr[i];
  // ...
}
```

Iterator 패턴에는 두가지 역할이 있습니다.  
`arr`의 역할인 Aggregation(집합), `i`의 역할인 Iterator(반복자)입니다.

---

### Aggregation(집합)

```typescript
// src/aggregation.ts
abstract class Aggregation {
  abstract getIterator(): MyIterator;
}
```

Aggregation는 추상메서드 `getIterator`를 갖고 있습니다.  
`getItorator`는 Aggregation에 맞는 타입의 Iterator를 생성하고 반환합니다.

---

### Iterator(반복자)

```typescript
// src/iterator.ts
abstract class Iterator {
  abstract hasNext(): boolean;
  abstract next(): any;
}
```

Iterator는 추상메서드 `hasNext`, `next`를 갖고 있습니다.  
`hasNext`는 Aggregation의 반복이 끝났는지 확인합니다. 다른 말로는 다음 순서가 있는지 확인합니다.  
`next`는 Aggregtation의 다음 항목을 가져오고, Iterator가 기억하고 있는 순서를 다음 순서로 이동합니다.

---

```javascript
for (var i = 0; i < n; i++) {
  var a = arr[i];
  // ...
}
```

`var i = 0;`부분은 `Aggregation.getIterator`가 구현합니다.  
`i < n;`부분은 `Iterator.hasNext`가 구현합니다.  
`i++`, `var a = arr[i];`부분은 `Iterator.next`가 구현합니다.

---

### 구현

Aggregation 클래스와 Iteraoter 클래스는 모두 추상클래스입니다.  
실제 구현은 두 클래스를 implement하여 만들어진 BookShelf, BookIterator클래스에서 이루어집니다.

### BookShelf

```typescript
// src/iterator/bookShelf.ts
class BookShelf implements Aggregation {
  // 데이터 저장할 배열.
  private books: Array<Book>;
  constructor() {
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
  getBookAt(index: number): Book {
    return this.books[index];
  }
  // 책 추가
  addBook(title: string) {
    this.books.push(new Book(title));
  }
}
```

### BookIterator

```typescript
// src/bookIterator.ts
class BookIterator implements MyIterator {
  // 반복에 사용할 카운터.
  private counter: number;
  // 생성자. 훑을 대상을 필드로 갖고 있음.
  constructor(private bookShelf: BookShelf) {
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
```

---

### Iterator를 이용하는 이유

- 하나씩 세는 행동을 구현과 분리하여 사용 가능합니다.  
  즉, Aggregation과 Iterator가 어떻게 구현되든 Main에서 Itorator를 사용하는 방법은 같습니다.
- 자료구조를 보호하면서 내용에 접근할 수 있습니다. Main은 Aggregation이 어떻게 구현되는지 모릅니다.
- hasNext와 next를 이용하여 자료구조를 변경하지 않으면서 노출시킬 정보를 변경할 수 있습니다.

**Main에서는 BookIterator가 아닌 Iterator의 메서드를 사용하여 프로그래밍하고 있습니다.**

---

## Chapter 02 Adapter

### Adapter란?

제공되는 기능과 필요한 기능 사이의 차이를 메꿔주는 디자인 패턴입니다.  
110볼트와 220볼트 사이의 변압기가 Adapter의 역할입니다.  
Adapter 패턴에는 3가지 역할이 있습니다.  
제공되는 기능인 `Adaptee`, 필요한 기능을 정의하는 `Target`, 필요한 기능을 구현하는 `Adapter`가 있습니다.

### Adaptee(제공되는 기능)

```typescript
class PrintString {
  constructor(private str: string) {}
  // "()"을 앞뒤로 붙여서 출력하는 함수
  showWithParen(): void {
    console.log(`(${this.str})`);
  }
  // "*"을 앞뒤로 붙여서 출력하는 함수
  showWithAter(): void {
    console.log(`*${this.str}*`);
  }
}
```

Adaptee는 이미 구현되어 있는 기능입니다.  
구버전 코드가 대표적인 예시입니다.  
이 예시에서는 `showWithParen`, `showWithAter`가 구현되어 있습니다.  
우리는 `constructor`을 이용해 `PrintString`에 문자열을 저장하는 대신, 다음과 같이 `showWithParen`, `showWithAter` 함수에 문자열을 인자로 넘겨주어 사용하고 싶습니다.

```typescript
class PrintString {
  showWithParen(str: string): void {
    console.log(`(${str})`);
  }
  showWithAter(str: string): void {
    console.log(`*${str}*`);
  }
}
```

하지만 `PrintString` 클래스를 수정하게 되면 다음과 같은 문제점이 발생합니다.

- `PrintString` 클래스를 읽고 내부 동작을 이해하는 수고가 생깁니다.
- 이미 버그가 없다고 검증된 클래스를 수정하므로서 테스트를 다시 해야 합니다.

따라서 우리는 `PrintString` 클래스를 직접 수정하는 대신, `Adapter` 패턴을 이용하기로 결정합니다.

### Target (팔요한 기능 정의)

```typescript
abstract class Banner {
  public abstract printStrong(str: string): void;
  public abstract printWeak(str: string): void;
}
```

`Adapter`를 만들기 전에 우선 어떤 기능이 필요한지를 먼저 정의합니다.  
문자열 인자로 받은 후 `"*"`을 앞뒤로 붙여서 출력하는 `printStrong` 함수와 마찬가지로 문자열 인자로 받은 후 `"()"`을 앞뒤로 붙여서 출력하는 `printWeak` 함수를 메서드로 갖는 `Banner` 클래스를 정의합니다.

### Adapter (필요한 기능 구현)

```typescript
class PrintBanner implements Banner {
  public printWeak(str: string): void {
    var printString: PrintString = new PrintString(str);
    printString.showWithParen();
  }
  public printStrong(str: string): void {
    var printString: PrintString = new PrintString(str);
    printString.showWithAter();
  }
}
```

드디어 주인공인 `Adapter`가 등장했습니다. `Adapter`는 `Target`인 `Banner` 클래스를 구현합니다.  
구현의 방법은 *상속*과 _위임_ 두가지가 있습니다.

이 글에서 *상속*을 통한 방법은 다루지 않습니다. ~~귀찮아서가 아닙니다.~~  
`Adapter` 패턴을 이용하는 이유는 다음 두가지입니다.

- `PrintString` 클래스를 읽고 내부 동작을 이해하는 수고가 생깁니다.
- 이미 버그가 없다고 검증된 클래스를 수정하므로서 테스트를 다시 해야 합니다.

만약 상속을 받아서 작성하게 된다면, 첫번째 이유가 사라지게 됩니다. 따라서 대부분의 경우 *위임*을 이용하여 `Adapter`를 구현하게 됩니다.

### 사용

```typescript
var PrintBanner: Banner = new PrintBanner();
PrintBanner.printStrong("HELLO!");
PrintBanner.printWeak("bye...");
```

```terminal
*HELLO!*
(bye...)
```
사용할 때는 우리가 필요한 내용을 정의한 `Target` 클래스인 `Banner`를 이용합니다.  
`Adapter` 클래스인 `PrintBanner`를 바로 사용하게되면 이후 `Adapter` 클래스의 구현이 바뀌었을 때 문제가 생길 수 있습니다.