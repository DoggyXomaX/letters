"use strict"

import { graphicsStore } from '../../stores/index.js';

export default class IGraphicsFactory {
  constructor() {
    if (new.target === IGraphicsFactory) {
      throw TypeError('Cannot construct IGraphicsFactory instances directly!');
    }
  }

  /** @returns {HTMLElement} */
  get viewport() {
    return graphicsStore.viewport;
  }

  /**
   * @param {string} id
   * @returns {IGraphics}
   */
  create(id) {
    throw TypeError('IGraphicsFactory.create not implemented!')
  }
}