import BarcodeScanner from './src/index.js'
import { promisify } from 'util'

import robot from 'robotjs';

const type = promisify(robot.typeString)

let scanner = new BarcodeScanner({
  endKey: 'Intro'
});

scanner.on('code', code => {
  console.log(code)
  // scanner.off();
})

setTimeout(async () => {
  // Type "Hello World".
  robot.typeString("code1lol");

  // Press enter.
  robot.keyTap("enter");
  robot.typeString("code1lol");

  // Press enter.
  robot.keyTap("enter");

},1000)

