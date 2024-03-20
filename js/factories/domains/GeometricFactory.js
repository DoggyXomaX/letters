"use strict"

class GeometricFactory {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} width
   * @param {number} height
   * @param {number} length
   * @returns {[TVector3, TVector3][]}
   */
  createCube(x, y, z, width, height, length) {
    const w = width / 2;
    const h = height / 2;
    const l = length / 2;
    return [
      [{ x: -w, y: -h, z: -l }, { x:  w, y: -h, z: -l }],
      [{ x:  w, y: -h, z: -l }, { x:  w, y:  h, z: -l }],
      [{ x:  w, y:  h, z: -l }, { x: -w, y:  h, z: -l }],
      [{ x: -w, y:  h, z: -l }, { x: -w, y: -h, z: -l }],
      [{ x: -w, y: -h, z:  l }, { x:  w, y: -h, z:  l }],
      [{ x:  w, y: -h, z:  l }, { x:  w, y:  h, z:  l }],
      [{ x:  w, y:  h, z:  l }, { x: -w, y:  h, z:  l }],
      [{ x: -w, y:  h, z:  l }, { x: -w, y: -h, z:  l }],

      [{ x: -w, y: -h, z: -l }, { x: -w, y: -h, z:  l }],
      [{ x: -w, y: -h, z:  l }, { x: -w, y:  h, z:  l }],
      [{ x: -w, y:  h, z:  l }, { x: -w, y:  h, z: -l }],
      [{ x: -w, y:  h, z: -l }, { x: -w, y: -h, z: -l }],
      [{ x:  w, y: -h, z: -l }, { x:  w, y: -h, z:  l }],
      [{ x:  w, y: -h, z:  l }, { x:  w, y:  h, z:  l }],
      [{ x:  w, y:  h, z:  l }, { x:  w, y:  h, z: -l }],
      [{ x:  w, y:  h, z: -l }, { x:  w, y: -h, z: -l }],

      [{ x: -w, y: -h, z: -l }, { x:  w, y: -h, z: -l }],
      [{ x:  w, y: -h, z: -l }, { x:  w, y: -h, z:  l }],
      [{ x:  w, y: -h, z:  l }, { x: -w, y: -h, z:  l }],
      [{ x: -w, y: -h, z:  l }, { x: -w, y: -h, z: -l }],
      [{ x: -w, y:  h, z: -l }, { x:  w, y:  h, z: -l }],
      [{ x:  w, y:  h, z: -l }, { x:  w, y:  h, z:  l }],
      [{ x:  w, y:  h, z:  l }, { x: -w, y:  h, z:  l }],
      [{ x: -w, y:  h, z:  l }, { x: -w, y:  h, z: -l }],
    ].map((line) => line.map((point) => ({
      x: x + point.x,
      y: y + point.y,
      z: z + point.z,
    })));
  }
}

export default new GeometricFactory();