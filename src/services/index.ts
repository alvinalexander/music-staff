import { Subject } from 'rxjs';
import { InputEventNoteon, InputEventNoteoff} from 'webmidi';

const noteOnSubject = new Subject<InputEventNoteon>();

const notOffSubject = new Subject<InputEventNoteoff>();

export const noteOnService =  {
    notifyNewNote: (e: InputEventNoteon) => noteOnSubject.next(e),
    receiveNote: () => noteOnSubject.asObservable()
} 

export const noteOffService =  {
    notifyNewNote: (e: InputEventNoteoff) => notOffSubject.next(e),
    receiveNote: () => notOffSubject.asObservable()
} 
