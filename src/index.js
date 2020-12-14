import { EventEmitter } from 'events';
import { events as inputs } from 'gkm';
import _enventHandler from './eventHandler.js'

export default class BarcodeScanner extends EventEmitter {
  constructor(options) {
    super()
    this.options = Object.assign({
      latency: 50,
      minLength: 3,
      endKey: 'Enter',
      validKey: /^\w$/,
      devicePrefix: null
    }, options);
    this._enventHandler = _enventHandler.bind(this, this.options)
    process.nextTick(() => {
      this.initHandler()
    });
  }

  async initHandler() {
    inputs.on('key.pressed', this._enventHandler)
  }

  off() {
    inputs.removeAllListeners('key.pressed',  this._enventHandler)
  }

}