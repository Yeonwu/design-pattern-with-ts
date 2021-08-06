import { MyIterator } from "./iterator";
/**
 * 
 * Aggregation = 집합
 * Iterator를 사용해 순서대로 훑을 대상.
 * 
 */

export abstract class Aggregation {
  /**
   * getIterator = iterator 생성.
   * 새로운 iterator는 counter가 0부터 시작. 
   * "for (var i = 0" 부분에 해당함.
   */ 
    
    
    
  abstract getIterator(): MyIterator;
}
