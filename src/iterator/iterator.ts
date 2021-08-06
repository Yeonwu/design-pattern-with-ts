/**
 * 
 * MyIterator = 순서대로 훑는 객체.
 * Iterator가 이미 존재하여 MyIterator로 작성.
 */

export abstract class MyIterator {
    /**
     * hasNext = 훑고 있는 대상의 다음 대상이 있는지 확인.
     * "for(var i=0; i<n" 부분에 해당함.
     */
    abstract hasNext():boolean
    /**
     * next = 훎고 있는 대상의 다음 대상을 가져오고 다음 순서로 이동.
     * "for(var i=0; i<n; i++) var next = arr[i]" 부분에 해당함.
     */
    abstract next():any
}