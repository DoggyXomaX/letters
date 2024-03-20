import Mathf from './Mathf.js';

export default class Vector3 {
  /**
   * @param {TVector3} a
   * @param {TVector3} b
   * @returns {TVector3}
   */
  static add(a, b) {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
      z: a.z + b.z,
    };
  }

  /**
   * @param {TVector3} a
   * @param {TVector3} b
   * @returns {TVector3}
   */
  static sub(a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y,
      z: a.z - b.z,
    };
  }

  /**
   * @param {TVector3} vector
   * @returns {number}
   **/
  static sqrMagnitude(vector) {
    return vector.x ** 2 + vector.y ** 2 + vector.z ** 2;
  }

  /**
   * @param {TVector3} vector
   * @returns {number}
   **/
  static magnitude(vector) {
    return Math.sqrt(Vector3.sqrMagnitude(vector));
  }

  /**
   * @param {TVector3} a
   * @param {TVector3} b
   * @returns {number}
   */
  static sqrDistance(a, b) {
    return Vector3.sqrMagnitude(Vector3.sub(b, a));
  }
  /**
   * @param {TVector3} a
   * @param {TVector3} b
   * @returns {number}
   */
  static distance(a, b) {
    return Vector3.magnitude(Vector3.sub(b, a))
  }

  /**
   * @param {TVector3} a
   * @param {TVector3} b
   * @param {number} t
   * @returns {TVector3}
   */
  static lerp(a, b, t){
    return {
      x: Mathf.lerp(a.x, b.x, t),
      y: Mathf.lerp(a.y, b.y, t),
      z: Mathf.lerp(a.z, b.z, t),
    };
  }

  /**
   * @param {TVector3} vector
   * @param {number} angle
   * @returns {TVector3}
   */
  static rotateX(vector, angle){
    const y = vector.y * Math.cos(angle) - vector.z * Math.sin(angle);
    const z = vector.z * Math.cos(angle) + vector.y * Math.sin(angle);
    return { x: vector.x, y, z };
  }

  /**
   * @param {TVector3} vector
   * @param {number} angle
   * @returns {TVector3}
   */
  static rotateY(vector, angle){
    const x = vector.x * Math.cos(angle) + vector.z * Math.sin(angle);
    const z = vector.z * Math.cos(angle) - vector.x * Math.sin(angle);
    return { x, y: vector.y, z };
  }

  /**
   * @param {TVector3} vector
   * @param {number} angle
   * @returns {TVector3}
   */
  static rotateZ(vector, angle){
    const x = vector.x * Math.cos(angle) - vector.y * Math.sin(angle);
    const y = vector.y * Math.cos(angle) + vector.x * Math.sin(angle);
    return { x, y, z: vector.z };
  }
}