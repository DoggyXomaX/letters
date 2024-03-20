"use strict"

import v4 from '../lib/v4.js';

export default class IDomain {
  /** @type {string} */
  id;

  constructor() {
    if (new.target === IDomain) {
      throw new TypeError('Cannot construct IDomain instances directly!');
    }

    this.id = v4();
  }

  /**
   * @param {TAnyStub} data
   * @returns {void}
   **/
  set(data) {
    throw Error('IDomain.set not implemented!');
  }
}