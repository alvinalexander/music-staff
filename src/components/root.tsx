import React, {useState} from 'react';
import App from './App';
import WebMidi, {Input} from 'webmidi';
import {noteOffService, noteOnService} from "../services";



export default function Root() {
    const [midiInputs, setMidiInputs] = useState<Input[]>([...WebMidi.inputs]);

    const makeActiveDevice = (id: Input['id']) => {
        const input = WebMidi.getInputByName(id);
        if (input){
            input?.addListener("noteon", "all", (e) => {
                noteOnService.notifyNewNote(e);
            })

            input?.addListener("noteoff", "all", (e) => {
                noteOffService.notifyNewNote(e);
            })
        }else{
            console.error(`Input ${id} is not available`)
        }
    }

    return <App midiInputs={midiInputs} makeActive={makeActiveDevice}/>
}
