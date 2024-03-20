"use strict"

import IGraphics from './IGraphics.js';
import { configStore, letterStore } from '../stores/index.js';

export default class LetterGraphics extends IGraphics {
  /** @type {HTMLElement} */
  #letterElement;

  // Prevent frequent updates
  /** @type {boolean} */
  #visible;

  /** @type {string} */
  #text;

  /**
   * @param {string} id
   * @param {HTMLElement} viewport
   **/
  constructor(id, viewport) {
    super(id, viewport);

    this.#letterElement = this.#createLetterElement(this.viewport);
    this.#visible = true;
    this.#text = '';

    this.render();
  }

  get #letter() {
    return letterStore.getById(this.id);
  }

  render() {
    const letter = this.#letter;
    if (!letter || !letter.visible) {
      this.#hide();
      return;
    }

    if (letter.position.z < 0 || letter.position.z > configStore.maxDistance) {
      this.#hide();
      return;
    }

    this.#show();
    this.#updateTransform(letter.position);
    this.#updateText(letter.letter);
  }

  delete() {
    this.#letterElement.remove();
  }

  /** @param {HTMLElement} viewport */
  #createLetterElement(viewport) {
    const element = document.createElement('p');
    element.className = 'letter';
    element.style.color = `rgb(${Math.random() * 256 >> 0}, ${Math.random() * 256 >> 0}, ${Math.random() * 256 >> 0})`;
    viewport.append(element);
    return element;
  }

  #show() {
    if (!this.#visible) {
      this.#letterElement.style.display = 'block';
      this.#visible = true;
    }
  }

  #hide() {
    if (this.#visible) {
      this.#letterElement.style.display = 'none';
      this.#visible = false;
    }
  }

  /** @param {TVector3} position */
  #updateTransform(position) {
    const altZ = configStore.maxDistance - position.z;
    this.#letterElement.style.zIndex = `${altZ >> 0}`;

    const relativeValue = altZ / configStore.maxDistance

    const translate = `translate3d(${position.x}px, ${position.y}px, ${-position.z}px)`;
    const scale = `scale(${relativeValue})`;
    this.#letterElement.style.transform = `${translate} ${scale}`;
    this.#letterElement.style.opacity = `${relativeValue}`;
  }

  /** @param {string} text */
  #updateText(text) {
    if (this.#text !== text) {
      this.#letterElement.innerText = text;
      this.#text = text;
    }
  }
}