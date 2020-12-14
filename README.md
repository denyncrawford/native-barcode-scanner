Native Barcode Scanner is a simple utility inspired by [simple-barcode-scanner](https://github.com/hadeeb/simple-barcode-scanner) but made as a native and global keyboard scanner driver for Node, this means that it doesn't depend on the browser and it listens even when no GUI/UI is open. 

Most barcode scanners act like a keyboard, so NBS handles this by listening for native events without using the DOM API. This is useful for scanning without focusing on any screen and works for multiple devices.


