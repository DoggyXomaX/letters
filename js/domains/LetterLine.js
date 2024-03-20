"use strict"

import Mathf from '../lib/Mathf.js';
import IDomain from './IDomain.js';
import { letterStore } from '../stores/index.js';

/**
 * @typedef {{
 *   from?: TVector3;
 *   to?: TVector3;
 *   letterIds?: string[];
 * }} TLetterLineStub */

export default class LetterLine extends IDomain {
  /** @type {TVector3} */
  from;

  /** @type {TVector3} */
  to;

  /** @type {string[]} */
  letterIds;

  /** @param {TLetterLineStub} data */
  constructor(data) {
    super();

    this.from = { x: 0, y: 0, z: 0 };
    this.to = { x: 0, y: 0, z: 0 };
    this.letterIds = [];

    this.set(data);
  }

  /** @returns {Letter[]} */
  get #letters() {
    return this.letterIds
      .map((id) => letterStore.getById(id))
      .filter((letter) => letter);
  }

  /** @returns {number[]} */
  get #letterDeltas() {
    const { letterIds } = this;
    if (letterIds.length === 0) {
      return [];
    }

    if (letterIds.length === 1) {
      return [0.5];
    }

    const dt = 1 / (letterIds.length - 1);
    return letterIds.map((_, i) => dt * i);
  }

  get #letterPositions() {
    const { from, to } = this;
    return this.#letterDeltas.map((delta) => ({
      x: Mathf.lerp(from.x, to.x, delta),
      y: Mathf.lerp(from.y, to.y, delta),
      z: Mathf.lerp(from.z, to.z, delta),
    }))
  }

  /** @param {TLetterLineStub} data */
  set(data) {
    this.from = data.from ?? this.from;
    this.to = data.to ?? this.to;
    this.letterIds = data.letterIds ?? this.letterIds;
  }

  /**
   * @param {number} delta
   */
  invokeUpdate(delta) {
    const letterPositions = this.#letterPositions;
    this.#letters.forEach((letter, i) => {
      const targetPosition = letterPositions[i];
      letterStore.setById(letter.id, {
        position: {
          x: Mathf.lerp(letter.position.x, targetPosition.x, delta),
          y: Mathf.lerp(letter.position.y, targetPosition.y, delta),
          z: Mathf.lerp(letter.position.z, targetPosition.z, delta),
        }
      })
    });
  }
}