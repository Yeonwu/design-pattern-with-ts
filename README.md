# Design Pattern with Type Script

## 타입스크립트로 디자인 패턴 공부하기

다음 도서에 나오는 Java 코드를 Type Script로 재작성하며 공부한 내용 정리입니다.

> Java 언어로 배우는 디자인 패턴 입문 <br>
> YUKI HIROSHI

## 목차

- [Chapter 01 Iterator](#chapter-01-iterator)

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
export abstract class Aggregation {
  abstract getIterator(): MyIterator;
}
```

Aggregation는 추상메서드 `getIterator`를 갖고 있습니다.  
`getItorator`는 Aggregation에 맞는 타입의 Iterator를 생성하고 반환합니다.

---

### Iterator(반복자)

```typescript
// src/iterator.ts
export abstract class Iterator {
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

---
