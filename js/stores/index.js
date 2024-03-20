"use strict"

import LetterStore from './domainStores/LetterStore.js';
import LetterLineStore from './domainStores/LetterLineStore.js';
import ConfigStore from './ConfigStore.js';
import GraphicsStore from './GraphicsStore.js';
import LetterGraphicsFactory from '../factories/graphics/LetterGraphicsFactory.js';

const configStore = new ConfigStore();

const viewport = document.querySelector('#viewport');
if (!viewport) {
  throw Error('Failed to get #viewport element!');
}

const graphicsStore = new GraphicsStore(viewport);
const letterStore = new LetterStore();
const letterLineStore = new LetterLineStore();

/**
 * @param {TStoreChangeEvent} event
 * @param {IStore} store
 * @param {IGraphicsFactory} factory
 */
const makeStoreUpdate = (event, store, factory) => {
  event.ids.forEach((id) => {
    if (!store.exists(id)) {
      graphicsStore.deleteById(id);
      return
    }

    const graphics = graphicsStore.getById(id);
    if (!graphics) {
      graphicsStore.add(factory.create(id));
      return;
    }

    graphics.render();
  });
};

letterStore.addEventListener('change', (event) => {
  makeStoreUpdate(event, letterStore, LetterGraphicsFactory)
});

export {
  letterStore,
  letterLineStore,
  configStore,
  graphicsStore,
}