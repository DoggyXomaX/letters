"use strict"

import Letter from '../../domains/Letter.js';
import Vector3 from '../../lib/Vector3.js';
import IStore from './IStore.js';

export default class LetterStore extends IStore {
  /** @type {Letter[]} */
  items;

  constructor() {
    super();

    this.items = [];
  }

  /**
   * @param {TLetterStub} data
   * @returns {Letter}
   **/
  create(data) {
    const newLetter = new Letter(data);

    this.items.push(newLetter);
    this.invokeChangeEvent(newLetter.id);

    return newLetter;
  }

  /**
   * @param {string} id
   * @returns {Letter | undefined}
   **/
  getById(id) {
    return this.items.find((letter) => letter.id === id);
  }

  /**
   * @param {string} id
   * @param {TLetterStub} data
   */
  setById(id, data) {
    const letter = this.getById(id);
    if (letter) {
      letter.set(data);
      this.invokeChangeEvent(letter.id);
    }
  }

  /** @param {number} snapDistance */
  mergePoints(snapDistance) {
    /** @type {TVector3[]} */
    const uniquePositions = []
    this.items.forEach((letter) => {
      const hasIntersection = uniquePositions.some((position) =>
        Vector3.sqrDistance(position, letter.position) <= snapDistance * snapDistance
      );

      this.setById(letter.id, { visible: !hasIntersection });

      if (!hasIntersection) {
        uniquePositions.push(letter.position);
      }
    });
  }
}