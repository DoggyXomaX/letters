"use strict"

/** @typedef {{ x: number; y: number; z: number }} TVector3 */
/** @typedef {Letter | LetterLine} TAnyDomain */
/** @typedef {TLetterStub | TLetterLineStub} TAnyStub */

import GeometricFactory from './factories/domains/GeometricFactory.js';
import Vector3 from './lib/Vector3.js';
import { configStore, letterLineStore, letterStore } from './stores/index.js';

class App {
  /** @type {TVector3} */
  #scenePosition;

  /** @type {TVector3} */
  #deltaAngle;

  /** @type {TVector3} */
  #targetDeltaAngle;

  /** @type {number} */
  #globalDelta;

  /** @type {number} */
  #lastTimestamp;

  /** @type {number} */
  #deltaTime;

  /** @type {HTMLElement} */
  #fpsElement;

  constructor() {
    this.#scenePosition = { x: 0, y: 0, z: 200 };
    this.#deltaAngle = { x: 0, y: 0, z: 0 };
    this.#targetDeltaAngle = { x: 0, y: 0, z: 0 };
    this.#globalDelta = 0.0001;
    this.#lastTimestamp = 0;
    this.#deltaTime = 0;

    const fpsElement = document.querySelector('#fps');
    if (fpsElement === null) {
      throw Error('no fps element!');
    }

    this.#fpsElement = fpsElement;
  }

  init() {
    // Get text element
    const inputTextElement = document.querySelector('#input-text');
    if (inputTextElement === null) {
      throw Error('no inputText');
    }

    // Extract text
    /** @type {string} */
    const inputText = inputTextElement.innerText
    inputTextElement.remove();

    // Make text array
    const inputLetters = Array.from(inputText)
      // .filter((letter) => /\p{L}/u.test(letter))

    // Prepare cube
    const { x, y, z } = this.#scenePosition;
    const lines = GeometricFactory.createCube(x, y, z, 200, 200, 200);

    // Fill required letters count
    const { lettersPerLine } = configStore;
    const requiredLettersCount = lettersPerLine * lines.length;
    /** @type {string[]} */
    const letters = new Array(requiredLettersCount);
    for (let i = 0; i < requiredLettersCount; i += 1) {
      letters[i] = inputLetters[i % inputLetters.length];
    }

    // Create letters domains
    const createdLetters = letters.map((letter, i) => {
      return letterStore.create({ letter, position: { x: i * 64, y: 10, z: 0 } });
    });

    // Link letters to lines
    lines.forEach(([from, to], i) => {
      const letterIds = createdLetters
        .slice(i * lettersPerLine, (i + 1) * lettersPerLine)
        .map((letter) => letter.id);
      letterLineStore.create({ from, to, letterIds });
    });

    // Timers
    requestAnimationFrame((timestamp) => this.#animationTimer(timestamp));

    this.#fpsTimer();

    setInterval(() => {
      const spread = Math.PI / 180;
      this.#targetDeltaAngle = {
        x: Math.random() * spread - spread / 2,
        y: Math.random() * spread - spread / 2,
        z: Math.random() * spread - spread / 2,
      }
    }, 2000);

    setInterval(() => {
      this.#globalDelta = Math.min(0.1, this.#globalDelta * 1.05);
    }, 100);
  }

  /** @param {number} timestamp */
  #animationTimer(timestamp) {
    requestAnimationFrame((timestamp) => this.#animationTimer(timestamp));

    this.#deltaTime = (1000 / configStore.targetFps) / (timestamp - this.#lastTimestamp);
    this.#lastTimestamp = timestamp;

    this.#update();
  }

  #fpsTimer() {
    this.#fpsElement.innerText = (this.#deltaTime * configStore.targetFps).toFixed(2);

    setTimeout(() => {
      this.#fpsTimer();
    }, 1000 / configStore.fpsUpdateFrequency);
  }

  #update() {
    this.#deltaAngle = Vector3.lerp(this.#deltaAngle, this.#targetDeltaAngle, this.#globalDelta);

    letterLineStore.items.forEach((letterLine) => {
      /** @param {TVector3} point */
      const transformPoint = (point) => {
        let newPoint = Vector3.sub(point, this.#scenePosition);
        newPoint = Vector3.rotateX(newPoint, this.#deltaAngle.x);
        newPoint = Vector3.rotateY(newPoint, this.#deltaAngle.y);
        newPoint = Vector3.rotateZ(newPoint, this.#deltaAngle.z);
        newPoint = Vector3.add(newPoint, this.#scenePosition);

        return newPoint
      }

      letterLineStore.setById(letterLine.id, {
        from: transformPoint(letterLine.from),
        to: transformPoint(letterLine.to),
      });
    });

    letterLineStore.iterateLetterLines(this.#globalDelta);
    letterStore.mergePoints(configStore.snapDistance)
  }
}

new App().init();