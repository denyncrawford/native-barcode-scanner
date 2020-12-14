import BarcodeScanner from './dist/index.esm.js'

import robot from 'robotjs';

let scanner = new BarcodeScanner({
  endKey: 'Intro'
});

scanner.emit('code', {hello: 'hel'})

scanner.on('code', (code) => {
  console.log(code)
})

setTimeout(() => {
  // Type "Hello World".
  robot.typeString("code1lol");

  // Press enter.
  robot.keyTap("enter");
},1000)
