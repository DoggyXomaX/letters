"use strict"

import IGraphicsFactory from './IGraphicsFactory.js';
import LetterGraphics from '../../graphics/LetterGraphics.js';

export default new class LetterGraphicsFactory extends IGraphicsFactory {
  /**
   * @param {string} id
   * @returns {LetterGraphics}
   */
  create(id) {
    return new LetterGraphics(id, this.viewport);
  }
}