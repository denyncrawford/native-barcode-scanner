import BarcodeScanner from './src/index.js'

import robot from 'robotjs';

let scanner = new BarcodeScanner({
  endKey: 'Intro'
});

scanner.on('code', code => {
  console.log(code)
})

setTimeout(async () => {
  // Type "Hello World".
  robot.typeString("code1lol");

  // Press enter.
  robot.keyTap("enter");

  scanner.stopScan();
  robot.typeString("code1lol");

  // Press enter.
  robot.keyTap("enter");
  
},1000)

