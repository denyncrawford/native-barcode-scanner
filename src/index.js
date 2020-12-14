import { EventEmitter } from 'events';
import { events as inputs } from 'gkm';
import _enventHandler from './eventHandler.js'

/**
 * @class Represents the Scanner instance.
 */

export default class BarcodeScanner extends EventEmitter {
  /**
 * Creates an instance of Scanner.
 *
 * @constructor
 * @param {object} options The options to configure the instance
 * @param {number} otions.latency Max time duration (in ms) between consecutive inputs
 * @param {number} option.minLength Min length of a valid barcode
 * @param {string} option.endKey key string indicating end of barcode
 * @param {RegExp} options.endKey Regular expression to check for a valid key in barcode
 * @param {string | null} options.devicePrefix Prefix for device scoped events
 */
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

  /**
   * Starts the main activity.
   *
   * @returns {void} void.
   */

  async initHandler() {
    inputs.on('key.pressed', this._enventHandler);
  }

  /**
 * Stop listening the events.
 *
 * @returns {void} void
 */

  async off() {
    inputs.removeListener('key.pressed',  this._enventHandler)
  }

}