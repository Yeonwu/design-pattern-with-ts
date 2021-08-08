# Design Pattern with Type Script

## 타입스크립트로 디자인 패턴 공부하기

다음 도서에 나오는 Java 코드를 Type Script로 재작성하며 공부한 내용 정리입니다.  
**개인적인 의견이 포함되어 있습니다. 틀린 부분이나, 다른 의견이 있으시다면 피드백 부탁드립니다.**

> Java 언어로 배우는 디자인 패턴 입문 <br>
> YUKI HIROSHI

## 목차

- [Chapter 01 Iterator](#chapter-01-iterator)
- [Chapter 02 Adapter](#chapter-02-adapter)

---

# Chapter 01 Iterator

## Iterator 패턴이란?

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

## Aggregation(집합)

```typescript
// src/aggregation.ts
abstract class Aggregation {
  abstract getIterator(): MyIterator;
}
```

Aggregation는 추상메소드 `getIterator`를 갖고 있습니다.  
`getItorator`는 Aggregation에 맞는 타입의 Iterator를 생성하고 반환합니다.

---

## Iterator(반복자)

```typescript
// src/iterator.ts
abstract class Iterator {
  abstract hasNext(): boolean;
  abstract next(): any;
}
```

Iterator는 추상메소드 `hasNext`, `next`를 갖고 있습니다.  
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

## 구현

Aggregation 클래스와 Iteraoter 클래스는 모두 추상클래스입니다.  
실제 구현은 두 클래스를 implement하여 만들어진 BookShelf, BookIterator클래스에서 이루어집니다.

## BookShelf

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

## BookIterator

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

## Iterator를 이용하는 이유

- 하나씩 세는 행동을 구현과 분리하여 사용 가능합니다.  
  즉, Aggregation과 Iterator가 어떻게 구현되든 Main에서 Itorator를 사용하는 방법은 같습니다.
- 자료구조를 보호하면서 내용에 접근할 수 있습니다. Main은 Aggregation이 어떻게 구현되는지 모릅니다.
- hasNext와 next를 이용하여 자료구조를 변경하지 않으면서 노출시킬 정보를 변경할 수 있습니다.

**Main에서는 BookIterator가 아닌 Iterator의 메소드를 사용하여 프로그래밍하고 있습니다.**

---

# Chapter 02 Adapter

## Adapter란?

제공되는 기능과 필요한 기능 사이의 차이를 메꿔주는 디자인 패턴입니다.  
110볼트와 220볼트 사이의 변압기라고 생각하시면 편합니다.  
Adapter 패턴에는 다음과 같은 3가지 역할이 있습니다.

- `Adaptee` : 이미 제공되고 있는 기능. 110볼트.
- `Target` : 필요한 기능 정의. 220볼트,
- `Adapter` : 필요한 기능 구현. 110볼트 - 220볼트 변압기.

## Adaptee(제공되는 기능)

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

## Target (팔요한 기능 정의)

```typescript
abstract class Banner {
  public abstract printStrong(str: string): void;
  public abstract printWeak(str: string): void;
}
```

`Adapter`를 만들기 전에 우선 어떤 기능이 필요한지를 먼저 정의합니다.  
문자열 인자로 받은 후 `"*"`을 앞뒤로 붙여서 출력하는 `printStrong` 함수와 마찬가지로 문자열 인자로 받은 후 `"()"`을 앞뒤로 붙여서 출력하는 `printWeak` 함수를 메소드로 갖는 `Banner` 클래스를 정의합니다.

## Adapter (필요한 기능 구현)

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
구현의 방법은 **상속**과 **위임** 두가지가 있습니다.

이 글에서 상속을 통한 방법은 다루지 않습니다. ~~귀찮아서가 아닙니다.~~  
`Adapter` 패턴을 이용하는 이유는 다음 두가지입니다.

- `PrintString` 클래스를 읽고 내부 동작을 이해하는 수고가 생깁니다.
- 이미 버그가 없다고 검증된 클래스를 수정하므로서 테스트를 다시 해야 합니다.

만약 상속을 받아서 작성하게 된다면, 첫번째 이유가 사라지게 됩니다. 따라서 대부분의 경우 **위임**을 이용하여 `Adapter`를 구현하게 됩니다. 만약 `Adaptee` 클래스의 내부를 자세히 알고 있다면 **상속** 또한 좋은 방법입니다.

## 사용

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

---

# Chapter 03 Template Method

## Template Method란?

메소드의 동작 프로세스를 정의해두고, 세부 동작에 대한 구현은 하위 클래스에서 담당하는 디자인 패턴입니다.  
말 그대로 메소드에 대한 템플릿을 정의한다고 이해하면 편합니다.  
`Template Method` 패턴에는 두가지 역할이 존재합니다.

- `Abstract Class` : 추상 클래스. 템플릿 메소드를 구현. 템플릿 메소드에서 사용하고 있는 추상 메소드를 선언.
- `Concrete Class` : 구현 클래스. 템플릿 메소드에서 사용하고 있는 추상 메소드를 구체적으로 구현.

## Abstract Class (추상 클래스)

```typescript
abstract class Display {
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
```

`Abstract Class`인 `Display`클래스는 템플릿 메소드 `display`를 구현하고 있습니다. `Display`는 메소드 `open`과 `close`를 사용하고 있습니다. 또한 추상메소드인 `didOpen`, `print`, `willClose`를 사용하고 있습니다. 구체적인 동작은 없지만, 이 함수를 실행하면 **어떤 순서로 다른 메소드가 호출되는지**, 즉 **동작의 프로세스**를 정의하고 있습니다. 각각의 구체적인 동작은 `Concrete Class`에서 구현됩니다.

## Concrete Class (구현 클래스)

```typescript
class CharDisplay extends Display {
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
```

`Concrete Class`인 `CharDisplay` 클래스는 `Abstract Class`인 `Display`를래스를 상속받아 추상메소드 `didOpen`, `print`, `willClose`를 구현합니다. `display`함수의 구현 내용을 봅시다.

```typescript
this.display = (): void => {
  this.open();
  this.didOpen();
  for (var i = 0; i < 5; i++) {
    this.print();
  }
  this.willClose();
  this.close();
};
```

`open()`  
⇒ `didOpen()`  
⇒ `print()` (다섯번 반복)  
⇒ `willClose()`  
⇒ `close()` 순서로 실행됩니다.  
이 중에서 `open()`과 `close()`는 `Display` 클래스에서 구현하기 때문에 `CharDisplay`에서 구현할 수 없습니다. `CharDisplay` 클래스의 역할은 `didOpen`, `print`, `willClose`의 구현입니다.

다른 방법의 `Concrete Class`도 보고 싶다면 [/src/template-method/stringDisplay.ts](./src/template-method/stringDisplay.ts)를 참고하시가 바랍니다.

이처럼 `Template Method` 패턴을 이용하게 되면 같은 틀로 다르게 동작하는 여러 메소드를 만들 수 있습니다.

## 사용

```typescript
var charDisplay: Display = new CharDisplay("C");
charDisplay.display();

var stringDisplay: Display = new StringDisplay("Hello World!!");
stringDisplay.display();
```
이제는 익숙해진 모습입니다. `CharDisplay`나 `StringDisplay`에서 `display` 메소드를 호출하는 대신 `Display`에서 호출합니다. 구체적인 구현을 맡은 클래스는 구현만 하고 사용은 선언을 맡은 클래스에서 합니다.
