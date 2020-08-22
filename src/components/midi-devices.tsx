import React, { FunctionComponent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Input } from 'webmidi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

type MidiDevicesProps = {
    devices: Input[];
    onDeviceSelect: (id: Input['id']) => void;
} 

const MidiDevices: FunctionComponent<MidiDevicesProps> = ({devices, onDeviceSelect}) => {
    const classes = useStyles();
    const [midiDevice, setMidiDevice] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const midiDeviceName = event.target.value as string 
        onDeviceSelect(midiDeviceName)
        setMidiDevice(event.target.value as string);
    };

    const menuItems = devices.map(d => (
               <MenuItem value={d.name} key={d.id}>{d.name}</MenuItem>
        ));

    return (


    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="input-midi-device-label">Input Midi Device</InputLabel>
        <Select
          labelId="input-midi-device"
          id="input-midi-device-select"
          value={midiDevice}
          onChange={handleChange}
        >
          {menuItems} 
        </Select>
        <FormHelperText>Select a input midi devices.</FormHelperText>
      </FormControl>
    </div>)
}

export default MidiDevices