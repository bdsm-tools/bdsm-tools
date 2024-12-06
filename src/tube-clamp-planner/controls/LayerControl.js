import { Layers } from 'three';

export default {
  Selectable: (() => {
    const layers = new Layers();
    layers.set(1);
    return layers;
  })(),
};
