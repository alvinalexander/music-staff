import React, {FunctionComponent} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Settings from './settings';
import { Input } from 'webmidi';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      height: "100vh",
      borderTop: "none"
    },

  }),
);


type AppProps = {
  midiInputs: Input[],
  makeActive: (id: Input['id']) => void;
}

const App: FunctionComponent<AppProps> = ({midiInputs, makeActive}) => {
    const classes = useStyles();
    return(
    <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Paper className={`${classes.paper}`}>
              <Settings midiInputs={midiInputs} onDeviceSelect={makeActive}/>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              Staff Goes Here ...
            </Paper>
          </Grid>
        </Grid>
      </div>)
}

export default App;

