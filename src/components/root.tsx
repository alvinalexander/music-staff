import React, {useState} from 'react';
import App from './App';
import WebMidi, {Input} from 'webmidi';



export default function Root() {
    const [midiInputs, setMidiInputs] = useState<Input[]>([...WebMidi.inputs]);
    const [activeMidiDevice, setActiveMidiDevice] = useState<Input | undefined>()

    const makeActiveDevice = (id: Input['id']) => {
        const input = WebMidi.getInputByName(id);
        if (input){
            input?.addListener("noteon", "all", (e) => {
                console.log(e.note);
            })
        }else{
            console.error(`Input ${id} is not available`)
        }
    }

    return <App midiInputs={midiInputs} makeActive={makeActiveDevice}/>
}
