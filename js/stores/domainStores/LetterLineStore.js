"use strict"

import LetterLine from '../../domains/LetterLine.js';
import IStore from './IStore.js';

export default class LetterLineStore extends IStore {
  /** @type {LetterLine[]} */
  items;

  constructor() {
    super();

    this.items = [];
  }

  /**
   * @param {TLetterLineStub} data
   * @returns {LetterLine}
   **/
  create(data) {
    const newLetterLine = new LetterLine(data);

    this.items.push(newLetterLine);
    this.invokeChangeEvent(newLetterLine.id);

    return newLetterLine;
  }

  /**
   * @param {string} id
   * @returns {LetterLine | undefined}
   **/
  getById(id) {
    return this.items.find((letter) => letter.id === id);
  }

  /**
   * @param {string} id
   * @param {TLetterLineStub} data
   */
  setById(id, data) {
    const letterLine = this.getById(id);
    if (letterLine) {
      letterLine.set(data);
      this.invokeChangeEvent(letterLine.id);
    }
  }

  /** @param {number} delta */
  iterateLetterLines(delta) {
    this.items.forEach((letterLine) => {
      letterLine.invokeUpdate(delta);
    });
  }
}