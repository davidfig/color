## random.js
a color API for working with colors defined as 0 - 0xffffff

## rationale
I wanted a simple function-based package to manipulate colors in either hex-string format '#ffffff' (for css) or hex-number format 0xffffff (for pixi.js)

## Installation
```
npm i yy-color
```

# API
```js
/**
 * converts a #FFFFFF to 0x123456
 * @param  {string} color
 * @return {string}
 */
function poundToHex(color)

/**
 * converts a 0x123456 to #FFFFFF
 * @param  {string} color
 * @return {string}
 */
function hexToPound(color)

/**
 * converts a number to #FFFFFF
 * @param  {number} color
 * @return {string}
 */
function valueToPound(color)

/**
 * based on tinycolor
 * https://github.com/bgrins/TinyColor
 * BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
 * @param {string} color
 * @returns {object}
 */
function hexToHsl (color)

/** based on tinycolor
* https://github.com/bgrins/TinyColor
* BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
* @param {object|number} color {h, s, b} or h
* @param {number} [s]
* @param {number} [l]
* @returns number
*/
function hslToHex(color)

/** based on tinycolor
* https://github.com/bgrins/TinyColor
* BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
* @param {object} color
* @param {number} amount
*/
function saturate(color, amount)

/** based on tinycolor
* https://github.com/bgrins/TinyColor
* BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
* @param {object} color
* @param {number} amount
*/
function desaturate(color, amount)

/**
 * blends two colors together
 * @param  {number} percent [0.0 - 1.0]
 * @param  {string} color1 first color in 0x123456 format
 * @param  {string} color2 second color in 0x123456 format
 * @return {number}
 */
function blend(percent, color1, color2)

/**
 * returns a hex color into an rgb value
 * @param  {number} hex
 * @return {string}
 */
function hexToRgb(hex)

/**
 * rgb color to hex in the form of 0x123456
 * @param  {(number|string)} r first number or 'rgb(...)' string
 * @param  {(number|null)} g
 * @param  {(number|null)} b
 * @return {string}
 */
function rgbToHex(r, g, b)

/**
 * returns a random color with balanced r, g, b values (i.e., r, g, b either have the same value or are 0)
 * @param {number} min value for random number
 * @param {number} max value for random number
 * @return {number} color
 */
function random(min, max)

/**
 * returns a random color based on hsl
 * @param {number} hMin [0, 360]
 * @param {number} hMax [hMin, 360]
 * @param {number} sMin [0, 1]
 * @param {number} sMax [sMin, 1]
 * @param {number} lMin [0, 1]
 * @param {number} lMax [lMin, 1]
 */
function randomHSL(hMin, hMax, sMin, sMax, lMin, lMax)

/**
 * returns random colors based on HSL with different hues
 * based on http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
 * @returns {number[]} colors in hex format (0x123456)
 */
function randomGoldenRatioHSL(count, saturation, luminosity)

```
