"use strict"

export default new class Mathf {
  precision = 1e-8;

  /**
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  clamp(value, min, max) {
    if (value < min) {
      return min;
    }

    if (value > max) {
      return max;
    }

    return value;
  }

  /**
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  clampInner(value, min, max) {
    if (value < min + this.precision) {
      return min + this.precision;
    }

    if (value > max - this.precision) {
      return max - this.precision;
    }

    return value;
  }

  /**
   * @param {number} a
   * @param {number} b
   * @param {number} t
   * @returns {number}
   */
  lerp(a, b, t) {
    if (t < 0) {
      t = 0;
    }

    if (t > 1) {
      t = 1;
    }

    return a + (b - a) * t;
  };
}