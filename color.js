/**
 * @file color.js
 * @author David Figatner
 * @license MIT
 * @copyright YOPEY YOPEY LLC 2016
 * {@link https://github.com/davidfig/color}
 */

const Random = require('yy-random');

/** @class */
class Color
{
    /**
     * converts a #FFFFFF to 0x123456
     * @param  {string} color
     * @return {string}
     */
    poundToHex(color)
    {
        return '0x' + parseInt(color.substr(1)).toString(16);
    }

    /**
     * converts a 0x123456 to #FFFFFF
     * @param  {string} color
     * @return {string}
     */
    hexToPound(color)
    {
        return '#' + color.substr(2);
    }

    /**
     * converts a number to #FFFFFF
     * @param  {number} color
     * @return {string}
     */
    valueToPound(color)
    {
        return '#' + color.toString(16);
    }

    /**
     * based on tinycolor
     * https://github.com/bgrins/TinyColor
     * BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
     * @param {string} color
     * @returns {object}
     */
    hexToHsl (color)
    {
        var rgb = this.hexToRgb(color),
            r = rgb.r,
            g = rgb.g,
            b = rgb.b;
        var max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max === min)
        {
            h = s = 0; // achromatic
        }
        else
        {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return { h: h, s: s, l: l };
    }

    /** based on tinycolor
    * https://github.com/bgrins/TinyColor
    * BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
    * @param {object|number} color {h, s, b} or h
    * @param {number} [s]
    * @param {number} [l]
    * @returns number
    */
    hslToHex(color)
    {
        var r, g, b, h, s, l;
        if (arguments.length === 1)
        {
            h = color.h,
            s = color.s,
            l = color.l;
        }
        else
        {
            h = arguments[0];
            s = arguments[1];
            l = arguments[2];
        }

        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        if (s === 0)
        {
            r = g = b = l; // achromatic
        }
        else
        {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return this.rgbToHex(r * 255, g * 255, b * 255);
    }

    /* darkens a color by the percentage
    * @param {object} color in hex (0xabcdef)
    * @param {number} amount
    * @return {number}
    */
    darken(color, amount)
    {
        return this.blend(amount, color, 0);
    }

    /** based on tinycolor
    * https://github.com/bgrins/TinyColor
    * BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
    * @param {object} color
    * @param {number} amount
    */
    saturate(color, amount)
    {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = this.hexToHsl(color);
        hsl.s += amount / 100;
        hsl.s = Math.min(1, Math.max(0, hsl.s));
        return this.hslToHex(hsl);
    }

    /** based on tinycolor
    * https://github.com/bgrins/TinyColor
    * BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
    * @param {object} color
    * @param {number} amount
    */
    desaturate(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = this.hexToHsl(color);
        hsl.s -= amount / 100;
        hsl.s = Math.min(1, Math.max(0, hsl.s));
        return this.hslToHex(hsl);
    }

    /**
     * blends two colors together
     * @param  {number} percent [0.0 - 1.0]
     * @param  {string} color1 first color in 0x123456 format
     * @param  {string} color2 second color in 0x123456 format
     * @return {number}
     */
    blend(percent, color1, color2)
    {
        if (percent === 0)
        {
            return color1;
        }
        if (percent === 1)
        {
            return color2;
        }
        var r1 = color1 >> 16;
        var g1 = color1 >> 8 & 0x0000ff;
        var b1 = color1 & 0x0000ff;
        var r2 = color2 >> 16;
        var g2 = color2 >> 8 & 0x0000ff;
        var b2 = color2 & 0x0000ff;
        var percent1 = 1 - percent;
        var r = percent1 * r1 + percent * r2;
        var g = percent1 * g1 + percent * g2;
        var b = percent1 * b1 + percent * b2;
        return r << 16 | g << 8 | b;
    }

    /**
     * returns a hex color into an rgb value
     * @param  {number} hex
     * @return {string}
     */
    hexToRgb(hex)
    {
        if (hex === 0)
        {
            hex = '0x000000';
        }
        else if (typeof hex !== 'string')
        {
            var s = '000000' + hex.toString(16);
            hex = '0x' + s.substr(s.length - 6);
        }
        var result = /^0x?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * rgb color to hex in the form of 0x123456
     * @param  {number|string} r first number or 'rgb(...)' string
     * @param  {number|null} g
     * @param  {number|null} b
     * @return {string}
     */
    rgbToHex(r, g, b)
    {
        if (arguments.length === 1) {
            if (Array.isArray(arguments[0])) {
                var number = arguments[0];
                r = number[0];
                g = number[1];
                b = number[2];
            } else {
                var parse = r.replace(/( *rgb *\( *)|( )|(\) *;?)/,'');
                var numbers = parse.split(',');
                r = numbers[0];
                g = numbers[1];
                b = numbers[2];
            }
        }
        return '0x' + ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1);
    }

    /**
     * returns a random color with balanced r, g, b values (i.e., r, g, b either have the same value or are 0)
     * @param {number} min value for random number
     * @param {number} max value for random number
     * @return {number} color
     */
    random(min, max)
    {
        function random()
        {
            return Random.range(min, max);
        }

        var colors = [{r:1, g:1, b:1}, {r:1, g:1, b:0}, {r:1,g:0,b:1}, {r:0,g:1,b:1}, {r:1,g:0,b:0}, {r:0,g:1,b:0}, {r:0,g:0,b:1}];
        var color = Random.pick(colors);
        min = min || 0;
        max = max || 255;
        return this.rgbToHex(color.r ? random() : 0, color.g ? random() : 0, color.b ? random() : 0);
    }

    // h: 0-360, s: 0-1, l: 0-1
    /**
     * returns a random color based on hsl
     * @param {number} hMin [0, 360]
     * @param {number} hMax [hMin, 360]
     * @param {number} sMin [0, 1]
     * @param {number} sMax [sMin, 1]
     * @param {number} lMin [0, 1]
     * @param {number} lMax [lMin, 1]
     */
    randomHSL(hMin, hMax, sMin, sMax, lMin, lMax)
    {
        var color = {
            h: Random.range(hMin, hMax),
            s: Random.range(sMin, sMax, true),
            l: Random.range(lMin, lMax, true)
        };
        return this.hslToHex(color);
    }

    /**
     * returns random colors based on HSL with different hues
     * based on http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
     * @returns {number[]} colors in hex format (0x123456)
     */
    randomGoldenRatioHSL(count, saturation, luminosity)
    {
        const goldenRatio = 0.618033988749895;
        let h = Random.get(1, true);
        const colors = [];
        for (let i = 0; i < count; i++)
        {
            colors.push(this.hslToHex(h, saturation, luminosity));
            h = (h + goldenRatio) % 1;
        }
        return colors;
    }
};

module.exports = new Color();