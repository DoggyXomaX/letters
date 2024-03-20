"use strict"

const HexValues = '0123456789abcdef';
const V4Template = '12345678-1234-5678-1234-567812345678';

const v4 = () => Array
  .from(V4Template)
  .map((char) =>
    char !== '-' ? HexValues[Math.random() * 16 >> 0] : char
  )
  .join('');

export default v4;