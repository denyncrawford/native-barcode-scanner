import { isEndKey, isValid, formatKey } from './helpers.js'

let lastTime = 0;
let code = "";
let uppercase = false;

export default function (options, key, e) {
  key = key[0]
  const timeStamp = e ? e.timestamp : new Date().getTime();
  const timeDiff = timeStamp - lastTime;
  lastTime = timeStamp;

  if (key.includes("Shift")) return uppercase = true;
  
  if (timeDiff > options.latency) {
    // Maybe a normal key press or start of barcode
    if (!isEndKey(options.endKey, key) && isValid(options.validKey, key)) {
      key = formatKey(uppercase, key)
      code = key;
    } else code = "";
  } else if (isValid(options.validKey, key)) {
    // Still scanning
    key = formatKey(uppercase, key)
    uppercase = false;
    code += key;
  } else {
    if (isEndKey(options.endKey, key)) {
      // End of barcode
      if (code.length >= options.minLength && !options.devicePrefix) {
        this.emit('code', code);
      } else if (code.length >= options.minLength && options.devicePrefix) {
        // Check for device prefix
        if (code.includes(options.devicePrefix)) this.emit("code", code.slice(options.devicePrefix.length))
      }
    }
    // Invalid character, reset
    code = "";
  }
}