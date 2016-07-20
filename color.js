/* Copyright (c) 2016 YOPEY YOPEY LLC */

/**
 * static class with color functions
 */
Color = {

	/**
	 * converts a #FFFFFF to 0x123456
	 * @param  {string} color
	 * @return {string}
	 */
	poundToHex: function(color)
	{
		return '0x' + parseInt(color.substr(1)).toString(16);
	},

	/**
	 * converts a 0x123456 to #FFFFFF
	 * @param  {string} color
	 * @return {string}
	 */
	hexToPound: function(color)
	{
		return '#' + color.substr(2);
	},

	/**
	 * converts a number to #FFFFFF
	 * @param  {number} color
	 * @return {string}
	 */
	valueToPound: function(color)
	{
		return '#' + color.toString(16);
	},

	/**
	 * based on tinycolor
	 * https://github.com/bgrins/TinyColor
	 * BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
	 * @param {string} color
	 * @returns {object}
	 */
	hexToHsl: function (color)
	{
		var rgb = Color.hexToRgb(color),
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
	},

	/** based on tinycolor
	* https://github.com/bgrins/TinyColor
	* BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
	* @param {object} color
	*/
	hslToHex: function(color)
	{
		var r, g, b,
			h = color.h,
			s = color.s,
			l = color.l;

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

	    rgb = { r: r * 255, g: g * 255, b: b * 255 };
		return Color.rgbToHex();
	},

	/** based on tinycolor
	* https://github.com/bgrins/TinyColor
	* BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
	* @param {object} color
	* @param {number} amount
	*/
	darken: function(color, amount)
	{
		amount = amount || 10;
	    var hsl = Color.hexToHsl(color);
	    hsl.l -= amount / 100;
	    hsl.l = Math.min(1, Math.max(0, hsl.l));
	    return Color.hslToHex(hsl);
	},

	/** based on tinycolor
	* https://github.com/bgrins/TinyColor
	* BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
	* @param {object} color
	* @param {number} amount
	*/
	saturate: function(color, amount)
	{
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = Color.hexToHsl(color);
	    hsl.s += amount / 100;
	    hsl.s = Math.min(1, Math.max(0, hsl.s));
	    return Color.hslToHex(hsl);
	},

	/** based on tinycolor
	* https://github.com/bgrins/TinyColor
	* BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
	* @param {object} color
	* @param {number} amount
	*/
	desaturate: function(color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = Color.hexToHsl(color);
	    hsl.s -= amount / 100;
	    hsl.s = Math.min(1, Math.max(0, hsl.s));
	    return Color.hslToHex(hsl);
	},

	/**
	 * blends two colors together
	 * based on http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
	 *
	 * @param  {number} percent [0.0 - 1.0]
	 * @param  {string} color1    first color in 0x123456 format
	 * @param  {string} color2    second color in 0x123456 format
	 * @return {string}
	 */
	blend: function(percent, color1, color2)
	{
		var hex1 = Color.hexToRgb(color1),
			hex2 = Color.hexToRgb(color2);

		return '0x' + (0x1000000 + (Math.round((hex2.r - hex1.r) * percent) + hex1.r) * 0x10000 +
			(Math.round((hex2.g - hex1.g) * percent) + hex1.g) * 0x100 +
			(Math.round((hex2.b - hex1.b) * percent) + hex1.b)).toString(16).slice(1);
	},

	/**
	 * returns a hex color into an rgb value
	 * @param  {number} hex
	 * @return {string}
	 */
	hexToRgb: function(hex)
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
	},

	/**
	 * rgb color to hex in the form of 0x123456
	 * @param  {number|string} r first number or 'rgb(...)' string
	 * @param  {number|null} g
	 * @param  {number|null} b
	 * @return {string}
	 */
	rgbToHex: function(r, g, b)
	{
	    if (arguments.length === 1) {
	    	if (arguments[0].constructor === Array) {
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
		return "0x" + ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1);
	},

	random: function(min, max)
	{
		function random()
		{
			return Random.range(min, max);
		}
		var colors = [{r:1, g:1, b:1}, {r:1, g:1, b:0}, {r:1,g:0,b:1},{r:0,g:1,b:1},{r:1,g:0,b:0},{r:0,g:1,b:0},{r:0,g:0,b:1}];
		var color = Random.pick(colors);
		min = min || 0;
		max = max || 255;
		return Color.rgbToHex(color.r ? random() : 0, color.g ? random() : 0, color.b ? random() : 0);
	},

	// h: 0-360, s: 0-1, l: 0-1
	randomHSL: function(hMin, hMax, sMin, sMax, lMin, lMax)
	{
		var color = {
			h: Random.range(hMin, hMax),
			s: Random.range(sMin, sMax, true),
			l: Random.range(lMin, lMax, true)
		};
		return Color.hslToHex(color);
	}
};

// add support for AMD (Asynchronous Module Definition) libraries such as require.js.
if (typeof define === 'function' && define.amd)
{
    define(function()
    {
        return {
            color: color
        };
    });
}

// add support for CommonJS libraries such as browserify.
if (typeof exports !== 'undefined')
{
    module.exports = color;
}

// define globally in case AMD is not available or available but not used
if (typeof window !== 'undefined')
{
    window.color = color;
}