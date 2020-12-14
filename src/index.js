import { EventEmitter } from 'events';
import { events as inputs } from 'gkm';
import _enventHandler from './eventHandler.js'

const element = typeof document === 'undefined' ? null : window.document;

export default class BarcodeScanner extends EventEmitter {
  constructor(options) {
    super()
    this.options = Object.assign({
      latency: 50,
      minLength: 3,
      element,
      endKey: 'Enter',
      validKey: /^\w$/,
      devicePrefix: null
    }, options);
    process.nextTick(() => {
      this.initHandler()
    });
  }

  async initHandler() {
    const engine = this.options.element || inputs
    let keyword = engine.on ? 'key.pressed' : 'keydown';
    engine.on = engine.on || engine.addEventListener;
    engine.on(keyword, _enventHandler.bind(this, this.options))
  }

  off() {
    this.removeListener('code')
  }

}