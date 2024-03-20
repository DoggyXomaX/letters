"use strict"

export default class IGraphics {
  /** @type {string} */
  id;

  /** @type {HTMLElement} */
  viewport;

  /**
   * @param {string} id
   * @param {HTMLElement} viewport
   **/
  constructor(id, viewport) {
    if (new.target === IGraphics) {
      throw TypeError('Cannot construct IGraphics instances directly!');
    }

    this.id = id;
    this.viewport = viewport;
  }

  /** @returns {void} */
  render() {
    throw TypeError('IGraphics.render not implemented!');
  }

  /** @returns {void} */
  delete() {
    throw TypeError('IGraphics.delete not implemented!');
  }
}