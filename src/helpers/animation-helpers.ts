
import {Observable, Observer} from 'rxjs'
import gsap from 'gsap'

interface SVGNote extends SVGElement {
    className: "note"
}

export const noteOnAnimation = (el: SVGNote | null) => (Observable.create( (subscriber: Observer<String>) => {
    let tween : gsap.core.Tween;
    try{
      // subscriber.next("hello this is is an animation")
      tween = gsap.to(el, {
        onComplete: () => subscriber.complete(), 
        onUpdate: () => subscriber.next("Note-On Animation Updated"), 
        onStart: () => subscriber.next("Note-On Animation Started"), 
        opacity: 1,
        duration:0.1})
    }catch(err){
      subscriber.error(err)
    }
    return function unsubscribe(){
      tween.kill()
    }
  }))
  
  export const noteOffAnimation = (el: SVGNote | null) => (Observable.create((subscriber: Observer<String>) => {
    let tween : gsap.core.Tween;
    try{
      tween = gsap.to(el, {
        onComplete: () => subscriber.complete(), 
        onUpdate: () => subscriber.next("Note-off Animation Updated"), 
        onStart: () => subscriber.next("Note-off Animation Started"), 
        opacity: 0,
        duration:0.1})
    }catch(err){
      subscriber.error(err)
    }
    return function unsubscribe(){
      tween.kill()
    }
  }))