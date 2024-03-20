"use strict"

/** @typedef {{ ids: string[] }} TStoreChangeEvent */
/** @typedef {(event: TStoreChangeEvent) => void} TStoreChangeEventHandler */

export default class IStore {
  /** @type {IDomain[]} */
  items;

  /** @type {TStoreChangeEventHandler[]} */
  #changeEventListeners;

  constructor() {
    this.items = [];
    this.#changeEventListeners = [];
  }

  /**
   * @param {'change'} type
   * @param {TStoreChangeEventHandler} callback
   */
  addEventListener(type, callback) {
    if (type === 'change') {
      this.#changeEventListeners.push(callback);
    }
  }

  /**
   * @param {object} data
   * @returns {TAnyDomain}
   **/
  create(data) {
    throw TypeError('IStore.create not implemented!');
  }

  /**
   * @param {string} id
   * @returns {boolean}
   */
  exists(id) {
    return this.items.some((item) => item.id === id);
  }

  /**
   * @param {string} id
   * @returns {IDomain | undefined}
   **/
  getById(id) {
    throw TypeError('IStore.getById not implemented!');
  }

  /**
   * @param {string} id
   * @param {object} data
   * @returns {void}
   */
  setById(id, data) {
    throw TypeError('IStore.setById not implemented!');
  }

  /** @param {string} ids */
  invokeChangeEvent(...ids) {
    this.#changeEventListeners.forEach((listener) => {
      listener({ ids });
    });
  }
}