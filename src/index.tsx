import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/root';
import WebMidi from 'webmidi';
const enableWebMidi = new Promise((resolve, reject) => {
  WebMidi.enable( err => {
    if (err) {
      console.log("WebMidi could not be enabled.");
      reject(err);
    } else {
      console.log("WebMidi enabled!");
      resolve();
    }
  })
})

const init = () => {
  enableWebMidi.then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <Root />
      </React.StrictMode>,
      document.getElementById('root')
    );
  })
}

init();






// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
