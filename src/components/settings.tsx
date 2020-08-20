import React, { FunctionComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import MidiDevices from './midi-devices';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Input } from 'webmidi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
  })
);


type SettingsProps = {
    midiInputs: Input[];
    onDeviceSelect: (id: Input['id']) => void;
}

const Settings: FunctionComponent<SettingsProps> = ({midiInputs, onDeviceSelect}) => {
    const classes = useStyles();

    return (
    <div>
        <Typography variant="h4" gutterBottom className={classes.title}>
            Settings
        </Typography>
        <MidiDevices devices={midiInputs} onDeviceSelect={onDeviceSelect}/>
    </div>)
}


export default Settings;