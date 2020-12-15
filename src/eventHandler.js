import { isEndKey, isValid, formatKey } from './helpers.js'

let lastTime = 0;
let code = "";
let uppercase = false;

export default function (options, key) {

 // Prepare event

  const { 
    endKey, 
    validKey,
    minLength, 
    devicePrefix,
    latency
  } = options

  key = key[0]
  const timeStamp = new Date().getTime();
  const timeDiff = timeStamp - lastTime;
  lastTime = timeStamp;

  if (key.includes("Shift")) return uppercase = true;
  
  if (timeDiff > latency) {
    
    // Maybe a normal key press or start of barcode

    if (!isEndKey(endKey, key) && isValid(validKey, key)){
      code = formatKey(uppercase, key)
      uppercase = false
    } else code = "";

  } else if (isValid(validKey, key)) {
    // Still scanning
    code += formatKey(uppercase, key);
    uppercase = false

  } else {
    if (isEndKey(endKey, key)) {
      // End of barcode
      if (code.length >= minLength && !devicePrefix) {
        this.emit('code', code);
      } else if (code.length >= minLength && devicePrefix) {
        // Check for device prefix
        if (code.includes(devicePrefix)) this.emit("code", code.slice(devicePrefix.length))
      }
    }
    // Invalid scan, reset
    code = "";
  }
}