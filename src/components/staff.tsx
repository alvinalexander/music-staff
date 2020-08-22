import React, {ElementRef} from 'react';
//TODO move styles inline
import gsap, {TweenLite} from 'gsap';
import { Observable, Observer, Subscription } from "rxjs";
import {map, mergeAll, groupBy, distinctUntilChanged, mergeMap, merge} from "rxjs/operators"
import { InputEventNoteon, InputEventNoteoff} from 'webmidi';

import {noteOffService, noteOnService} from "../services"
import {noteOffAnimation, noteOnAnimation} from '../helpers/animation-helpers'

interface noteToRefMap {
    [note:string]: SVGElement | null
}  

//TODO come back to this later
interface EventWithRef extends KeyboardEvent{
  targetDOMElement: SVGElement | null;
}

class Staff extends React.Component<{},{}> {
    private infoBox: ElementRef<"div"> | null;
    private notesToRefs: noteToRefMap = {}
    private infoBoxTween: gsap.core.Tween | null;
    private noteAnimationsSubscription: Subscription | undefined;

    constructor(props: {}){
        super(props);
        this.infoBox = null
        this.infoBoxTween = null;
    }

    componentDidMount(){
      //might acutally be able to just do a simple tap
      const noteOnAnimations= noteOnService.receiveNote().pipe(
        mergeMap(e => noteOnAnimation(this.notesToRefs[e.note.name]))
      )

      const noteOffAnimations= noteOffService.receiveNote().pipe(
        mergeMap(e => noteOffAnimation(this.notesToRefs[e.note.name]))
      )
      // const noteAnimations = noteOnService.receiveNote().pipe(
      //   merge(noteOffService.receiveNote()), 
      //   groupBy((e: InputEventNoteon | InputEventNoteoff) => e.note.name),
      //   map(group => {
      //     //{....{InputEventNoteon['note']['name']=='C'....InputEventNoteoff['note']['name']=='C'}.....{InputEventNoteon['note']['name']=='D'....InputEventNoteoff['note']['name']=='D'} }
      //     return group.pipe(
      //       // distinctUntilChanged((prev, curr) => prev.type === curr.type), 
      //       //map to animatin observabla
      //       mergeMap(e => {
      //         //Could this conditional be avoided if we map to animation further up?
      //         const ref = this.notesToRefs[e.note.name]; // could be a map step 
      //         if (e.type === "noteon"){
      //           return noteOnAnimation(ref)
      //         }else{
      //           return noteOffAnimation(ref) 
      //         }
      //       })
      //     )
      //   }),
      //   mergeAll()
      // )
        this.infoBoxTween = TweenLite.to(this.infoBox, {opacity: 1, duration: 1})
        this.noteAnimationsSubscription = noteOnAnimations.pipe(merge(noteOffAnimations)).subscribe(console.log)
    }

    componentDidUpdate(){

    }

    componentWillUnmount(){
      this.noteAnimationsSubscription?.unsubscribe();
    }

    render(){

    return (<div style={{width: "100vw"}}>
    <div style={{textAlign:"center"}} ref={div => this.infoBox = div}>
      <h1>Interactive Staff</h1>
      <p>Choose a midi device on the left to get started.</p>
    </div>
   <svg xmlns="http://www.w3.org/2000/svg" width="620" height="747" viewBox="0 0 420 247">
      <g id="lines" fill="none" stroke="#31313d" strokeMiterlimit="10" strokeWidth="2.31918001">
        <line className="staff-line" id="l1" y1="113.6" x2="420" y2="113.6"/>
        <line className="staff-line" id="l2" y1="92.72" x2="420" y2="92.72"/>
        <line className="staff-line" id="l3" y1="71.85" x2="420" y2="71.85"/>
        <line className="staff-line" id="l4" y1="50.98" x2="420" y2="50.98"/>
        <line className="staff-line" id="l5" y1="30.11" x2="420" y2="30.11"/>
      </g>
      <g id ="gclef" fill="#31313d">
        <path d="M55.77 86.59a21 21 0 00-1.29-4 22.53 22.53 0 00-1.92-3.56A21.72 21.72 0 0040.41 70a18.89 18.89 0 00-3.7-.65 17.68 17.68 0 00-3.65.15c-.32 0-.64.1-1 .16-.36-3.82-.69-7.71-1-11.64a83.52 83.52 0 0010-11.82A37 37 0 0046 36.3a31.87 31.87 0 001.17-5.48c.12-.92.18-1.79.25-2.75v-2.58A42.67 42.67 0 0046.26 15 30 30 0 0042 5a16.81 16.81 0 00-1.86-2.25A10.44 10.44 0 0037.51.78a6.62 6.62 0 00-1.77-.65A5.12 5.12 0 0034.69 0h-.51a5.62 5.62 0 00-.7.1 5.2 5.2 0 00-2 1 6.89 6.89 0 00-1.28 1.33 15.59 15.59 0 00-2.26 5.24 41.66 41.66 0 00-.94 5 134.21 134.21 0 00-.67 19.44c.12 5.59.42 11.1.81 16.52-1.92 2-3.91 4.06-5.86 6.07-1.16 1.17-2.28 2.3-3.42 3.46s-2.35 2.52-3.43 3.84a51.38 51.38 0 00-5.64 8.6 41.23 41.23 0 00-3.64 9.57 33.25 33.25 0 00-1 10.12c0 .85.16 1.69.25 2.53s.27 1.66.51 2.48a23.79 23.79 0 001.69 4.73 21.82 21.82 0 006 7.68l.94.74 1 .66a23.7 23.7 0 002.08 1.23l1 .47.55.26.53.21 1.06.43 1.07.38a30.47 30.47 0 008.81 1.6 29.49 29.49 0 006.09-.44c.21 1.38.42 2.75.62 4.1.36 2.42.62 4.8.83 7.12a55.92 55.92 0 01.25 6.79 28 28 0 01-.26 3.21c0 .25-.07.55-.11.76l-.17.79a14.28 14.28 0 01-.43 1.41 12.15 12.15 0 01-3.1 4.77 10.76 10.76 0 01-4.56 2.52l-.62.14h-.24l-.34.05a12.09 12.09 0 01-1.21.09 10.13 10.13 0 01-2.35-.21 10 10 0 01-2.1-.7 8.89 8.89 0 01-1.72-1.09 6.53 6.53 0 01-1.94-3 6.38 6.38 0 01-.27-1.6 6.59 6.59 0 010-.77v-.39c0 .11 0 0 0 0v-.43a8 8 0 01.3-1.27 7.25 7.25 0 01.49-1.12 4.64 4.64 0 01.79-1 6.26 6.26 0 009.94-5.06 6.41 6.41 0 00-6.2-6.45 9.4 9.4 0 00-7.27 3.09 14 14 0 00-3.71 7.69 13.07 13.07 0 00-.13 2.27 16.58 16.58 0 00.25 2.42A14.29 14.29 0 0014.4 142a12 12 0 003.91 3.75 11.72 11.72 0 002.55 1.15 12.88 12.88 0 002.78.61 13.46 13.46 0 002.91 0 13.07 13.07 0 001.45-.21l.33-.08h.2l.18-.06.74-.2a14 14 0 002.81-1.31 14.25 14.25 0 002.49-2 14.56 14.56 0 003.39-5.65 16.79 16.79 0 00.44-1.66l.14-.8c.06-.32.07-.57.11-.85a29.38 29.38 0 00.2-3.39 104.44 104.44 0 00-1.12-14.14c-.18-1.39-.37-2.81-.56-4.23a27.34 27.34 0 008.91-3.81 23.62 23.62 0 006.2-6 20.54 20.54 0 002.13-3.8 19.46 19.46 0 00.76-2c.12-.33.21-.74.31-1.1s.19-.79.24-1.06l.18-.9.14-1.2a17.73 17.73 0 00.08-2.18 19.15 19.15 0 00-.53-4.24M34.48 4.84s.06 0 0 0m-.09-.31zM30 32.08c0-3.13.09-6.28.26-9.42a79.93 79.93 0 011-9.33 36.55 36.55 0 011-4.45 11.15 11.15 0 011.66-3.58 1.44 1.44 0 01.5-.45h.12-.06.16a2.69 2.69 0 01.49.24 7.61 7.61 0 012.3 2.72 22.78 22.78 0 012.38 8.29 48.41 48.41 0 010 9l-.1 1.09-.14 1.22c-.1.67-.21 1.43-.34 2.12a24.28 24.28 0 01-1.16 4A29.66 29.66 0 0133.81 41c-1.09 1.41-2.27 2.8-3.5 4.19-.21-4.36-.31-8.72-.31-13.11M29.77 111a22.51 22.51 0 01-4-.47 23.63 23.63 0 01-3.91-1.15l-1-.37-.94-.44-.46-.22-.43-.23-1-.53a18.11 18.11 0 01-3.03-2.47 15.49 15.49 0 01-2.58-3.12 17.28 17.28 0 01-1.73-3.63 17.6 17.6 0 01-.87-4c-.1-.67-.1-1.36-.14-2s0-1.37.07-2.06c.43-5.52 2.73-10.89 5.89-15.7a54.5 54.5 0 015.44-6.85c1-1.08 2.05-2.14 3.14-3.15l3.49-3.28.44-.43q.47 4.84 1 9.59l-.29.12-.76.33c-.47.24-.94.46-1.4.72A18.83 18.83 0 0019 79.8a17.15 17.15 0 00-1.71 8.61 12.59 12.59 0 001.92 6A7.59 7.59 0 0022 97.07l.5.25.36.13.3.11-.22-.23a7.74 7.74 0 01-.57-.69 7.84 7.84 0 01-1.29-3 11.73 11.73 0 01.12-5 14.85 14.85 0 012.8-5.86 14.54 14.54 0 016-4.5h.11c.36 2.65.74 5.28 1.14 7.86.84 5.57 1.76 11 2.65 16.18q.68 3.91 1.32 7.69c0 .14 0 .28.07.43a20.53 20.53 0 01-5.55.56m19.7-16.61A16.26 16.26 0 0143.87 106a19.16 19.16 0 01-6.87 3.94c-1-7.66-2.14-15.74-3.13-24.18-.32-2.73-.62-5.49-.92-8.28H33c.33 0 .65-.09 1-.1a11 11 0 014 .62 16.85 16.85 0 017.77 5.86 19.33 19.33 0 012.68 4.85 16.23 16.23 0 01.76 2.75 13.62 13.62 0 01.18 1.43v.64c0 .13 0-.08 0 0z"/>
        <path d="M63.2 95.11a4.27 4.27 0 104.26 4.27 4.27 4.27 0 00-4.26-4.27"/>
        <path d="M63.2 89.73a4.27 4.27 0 10-4.27-4.27 4.27 4.27 0 004.27 4.27"/>
      </g>
    <g className="notes">
      <g className="note" id="C" ref={g => this.notesToRefs["C"] = g}>
            <path d="M166.5 124.33c-7.17 0-13 4.84-13 10.83s5.82 10.82 13 10.82 13-4.84 13-10.82-5.81-10.83-13-10.83" fill="#31313d"/>
      <line x1="144.47" y1="134.98" x2="188.53" y2="134.98" fill="none" stroke="#31313d" strokeMiterlimit="10" strokeWidth="2.31918001"/>
      </g>
      <g id="D" className="note" ref={g => this.notesToRefs["D"] = g}>
          <path d="M189.18 113.6c-7.18 0-13 4.85-13 10.83s5.81 10.83 13 10.83 13-4.85 13-10.83-5.81-10.83-13-10.83" fill="#31313d"/>
      </g>
      <g id="E" className="note" ref={g => this.notesToRefs["E"] = g}>
        <path d="M166.5 102.86c-7.17 0-13 4.85-13 10.83s5.82 10.82 13 10.82 13-4.84 13-10.82-5.81-10.83-13-10.83" fill="#31313d"/>
      </g>
    </g>
  </svg>
  </div>
  )
    }

}

export default Staff;