"use strict"

import IDomain from './IDomain.js';

/**
 * @typedef {{
 *   letter?: string;
 *   position?: TVector3;
 *   visible?: boolean
 * }} TLetterStub */

export default class Letter extends IDomain {
  /** @type {TVector3} */
  position;

  /** @type {string} */
  letter;

  /** @type {boolean} */
  visible;

  /** @param {TLetterStub} data */
  constructor(data) {
    super();

    this.position = { x: 0, y: 0, z: 0 };
    this.letter = '.';
    this.visible = true;

    this.set(data);
  }

  /** @param {TLetterStub} data */
  set(data) {
    this.letter = data.letter ?? this.letter;
    this.position = data.position ?? this.position;
    this.visible = data.visible ?? this.visible;
  }
}