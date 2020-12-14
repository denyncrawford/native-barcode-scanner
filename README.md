# Native Barcode Scanner 

It is a simple utility inspired by [simple-barcode-scanner](https://github.com/hadeeb/simple-barcode-scanner) but made as a native and global keyboard scanner driver for Node, this means that it doesn't depend on the browser and it listens even when no GUI/UI is focused. 

Most barcode scanners act like a keyboard, NBS handles this by listening for native events without using the DOM API. This is useful for scanning without focusing on any screen and works for multiple devices.

### Why?

I needed a way to use multiple scanners on a PC without depending on one window being foused. It is not viable / reliable to use on electron and browser runing on machines used by several users at time.

**Don't scare!** NBS is pretty simple too and it can be used with a sigle scanner on a simple app :D, but with the security that data is not getting lost anymore.

### How?

Barcode scanners are HID devices also, but there's one trick, they are **FORBIDEN** by some systems... Basically they doesn't allow HID connections for keyboards and mouses for security reasons. So while looking for a solution I found that `node-hid` is not that useful and we can't take a direct connection from the device. 

**So, how it is native?** Well, this is the bittersweet part: We use Java to capture native/global keys and keybindings events, and yeah... you have to install it :/ but it is not that hard :B (I mean, probably you have it already installed, you know... minecraft). This is because neither Node or Deno support native events for keyboards and mices. Anyway, it is incredibly fast as well. 

> I'm currently looking for a C++ solution like ioHook but its installation is a little bit cursed, and it crashes all the time (at least for me and my builds) if you want to contribute with a native way to listen to key events and pipe them to JS please make a PR :D.

##  📦 Install

```bash
npm install --save native-barcode-scanner
```

```javascript
// using ES6 modules
import BarcodeScanner from "native-barcode-scanner";

// using CommonJS modules
const BarcodeScanner = require("native-barcode-scanner");
```

## 🖥️ Usage

You can use NBS as a global listener or as a dedicated device listener.

### Basic (global):

> This will listens to al devices and will catch all codes from the multiple emitting devices. This is the way if you have just one device or if your device doesn't allow prefixing. 

```javascript
import BarcodeScanner from "native-barcode-scanner";

const options = {...foo}

const scanner = BarcodeScanner(options);

// Add a global listener
scanner.on('code', code => {
  console.log(code);
});

// Remove the listener
scanner.off();
```

### Dedicated device:

As I said before, some devices allow code prefixing functions and you can use it to scope the NBS events.

To do this, you have to prefix your device with your choosen device ID string and then specify it at `options.devicePrefix`.

> **Note**: NBS doesn't prefix your device, you must use one that does. Please read your device user guide. 

```javascript
import BarcodeScanner from "native-barcode-scanner";

const options = {
  devicePrefix: 'id1'
}

const scanner = BarcodeScanner(options);

// Add a global device scoped listener
scanner.on('code', code => {
  // This only works for the device(s) prefixed with id1
  console.log(code);
});

// Remove the listener
scanner.off();
```

> **Note**: We un-prefix the code for you ;) you can log it as clean as it is on the paper.

# 🧰 API

### BarcodeScanner
Creates an instance of Scanner to use the code events.

**Parameters**

- `Options` **Object**

  - `latency` **Number** Max time duration (in ms) between consecutive inputs

    _default: `50`_

  - `minLength` **Number** Min length of a valid barcode

    _default: `3`_

  - `endKeys` **string** Key name indicating end of barcode

    Refer [Key Values | MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

    _default: `["Enter"]`_

  - `validKey` **RegExp** Regular expression to check for a valid key in barcode

    Refer [Key Values | MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

    _default: `/^\w$/`_
  
  - `devicePrefix` **string** Prefix ID for device scoped events

    _default: `null`

Returns **Scanner**

### Scanner

- #### on

  Starts listening for barcode scans and add/replace the listener

  **Parameters**

  - eventName **string** Event string must be `code`

  - handler **Function** Function to call on completion of barcode scan

    _Recieves the scanned code of the last input as parametes_

- #### off
  Stop listening for barcode scans and remove the listener
  
# 🌐 Using on web

Please if you are on browser use [simple-barcode-scanner](https://github.com/hadeeb/simple-barcode-scanner)

If you want the multi-device update use my fork [@denyncrawford/simple-barcode-scanner](https://github.com/denyncrawford/simple-barcode-scanner/tree/device-instance)

# 👥 Credits

Developer: [denyncrawford](https://github.com/denyncrawford/)

This idea couln't be possible without [simple-barcode-scanner](https://github.com/hadeeb/simple-barcode-scanner), thanks.

# 🏗️ Contributing

1. Create an issue related to the problem or idea and check if it is viable
2. Fork it :D
3. Create a new branch with your changes.
4. Make a PR.

# 📜 License

MIT License

Copyright (c) 2020 Miguel Rangel

[See full licese](https://github.com/denyncrawford/native-barcode-scanner/tree/main/LICENSE)