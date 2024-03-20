"use strict"

export default class GraphicsStore {
  /** @type {IGraphics[]} */
  container

  /** @type {HTMLElement} */
  viewport;

  /** @param {HTMLElement} viewport */
  constructor(viewport) {
    this.container = [];
    this.viewport = viewport;
  }

  /** @param {IGraphics} graphics */
  add(graphics) {
    this.container.push(graphics);
  }

  /** @param {string} id */
  getById(id) {
    return this.container.find((item) => item.id === id);
  }

  /** @param {string} id */
  deleteById(id) {
    const graphicsIndex = this.container.findIndex((item) => item.id === id);
    if (graphicsIndex !== -1) {
      const [graphics] = this.container.splice(graphicsIndex, 1);
      graphics.delete();
    }
  }
}