## random.js
a color API for working with colors defined as 0 - 0xffffff

## Installation
include color.js in your project or add to your workflow

    npm install yy-color

# API Reference
**Kind**: global class  

* [Color](#Color)
    * [.poundToHex(color)](#Color+poundToHex) ⇒ <code>string</code>
    * [.hexToPound(color)](#Color+hexToPound) ⇒ <code>string</code>
    * [.valueToPound(color)](#Color+valueToPound) ⇒ <code>string</code>
    * [.hexToHsl(color)](#Color+hexToHsl) ⇒ <code>object</code>
    * [.hslToHex(color)](#Color+hslToHex)
    * [.saturate(color, amount)](#Color+saturate)
    * [.desaturate(color, amount)](#Color+desaturate)
    * [.blend(percent, color1, color2)](#Color+blend) ⇒ <code>number</code>
    * [.hexToRgb(hex)](#Color+hexToRgb) ⇒ <code>string</code>
    * [.rgbToHex(r, g, b)](#Color+rgbToHex) ⇒ <code>string</code>
    * [.random(min, max)](#Color+random) ⇒ <code>number</code>
    * [.randomHSL(hMin, hMax, sMin, sMax, lMin, lMax)](#Color+randomHSL)

<a name="Color+poundToHex"></a>

### color.poundToHex(color) ⇒ <code>string</code>
converts a #FFFFFF to 0x123456

**Kind**: instance method of <code>[Color](#Color)</code>  

| Param | Type |
| --- | --- |
| color | <code>string</code> | 

<a name="Color+hexToPound"></a>

### color.hexToPound(color) ⇒ <code>string</code>
converts a 0x123456 to #FFFFFF

**Kind**: instance method of <code>[Color](#Color)</code>  

| Param | Type |
| --- | --- |
| color | <code>string</code> | 

<a name="Color+valueToPound"></a>

### color.valueToPound(color) ⇒ <code>string</code>
converts a number to #FFFFFF

**Kind**: instance method of <code>[Color](#Color)</code>  

| Param | Type |
| --- | --- |
| color | <code>number</code> | 

<a name="Color+hexToHsl"></a>

### color.hexToHsl(color) ⇒ <code>object</code>
based on tinycolor
https://github.com/bgrins/TinyColor
BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE

**Kind**: instance method of <code>[Color](#Color)</code>  

| Param | Type |
| --- | --- |
| color | <code>string</code> | 

<a name="Color+hslToHex"></a>

### color.hslToHex(color)
based on tinycolor
https://github.com/bgrins/TinyColor
BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE

**Kind**: instance method of <code>[Color](#Color)</code>  

| Param | Type |
| --- | --- |
| color | <code>object</code> | 

<a name="Color+saturate"></a>

### color.saturate(color, amount)
based on tinycolor
https://github.com/bgrins/TinyColor
BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE

**Kind**: instance method of <code>[Color](#Color)</code>  

| Param | Type |
| --- | --- |
| color | <code>object</code> | 
| amount | <code>number</code> | 

<a name="Color+desaturate"></a>

### color.desaturate(color, amount)
based on tinycolor
https://github.com/bgrins/TinyColor
BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE

**Kind**: instance method of <code>[Color](#Color)</code>  

| Param | Type |
| --- | --- |
| color | <code>object</code> | 
| amount | <code>number</code> | 

<a name="Color+blend"></a>

### color.blend(percent, color1, color2) ⇒ <code>number</code>
blends two colors together

**Kind**: instance method of <code>[Color](#Color)</code>  

| Param | Type | Description |
| --- | --- | --- |
| percent | <code>number</code> | [0.0 - 1.0] |
| color1 | <code>string</code> | first color in 0x123456 format |
| color2 | <code>string</code> | second color in 0x123456 format |

<a name="Color+hexToRgb"></a>

### color.hexToRgb(hex) ⇒ <code>string</code>
returns a hex color into an rgb value

**Kind**: instance method of <code>[Color](#Color)</code>  

| Param | Type |
| --- | --- |
| hex | <code>number</code> | 

<a name="Color+rgbToHex"></a>

### color.rgbToHex(r, g, b) ⇒ <code>string</code>
rgb color to hex in the form of 0x123456

**Kind**: instance method of <code>[Color](#Color)</code>  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>number</code> &#124; <code>string</code> | first number or 'rgb(...)' string |
| g | <code>number</code> &#124; <code>null</code> |  |
| b | <code>number</code> &#124; <code>null</code> |  |

<a name="Color+random"></a>

### color.random(min, max) ⇒ <code>number</code>
returns a random color with balanced r, g, b values (i.e., r, g, b either have the same value or are 0)

**Kind**: instance method of <code>[Color](#Color)</code>  
**Returns**: <code>number</code> - color  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>number</code> | value for random number |
| max | <code>number</code> | value for random number |

<a name="Color+randomHSL"></a>

### color.randomHSL(hMin, hMax, sMin, sMax, lMin, lMax)
returns a random color based on hsl

**Kind**: instance method of <code>[Color](#Color)</code>  

| Param | Type | Description |
| --- | --- | --- |
| hMin | <code>number</code> | [0, 360] |
| hMax | <code>number</code> | [hMin, 360] |
| sMin | <code>number</code> | [0, 1] |
| sMax | <code>number</code> | [sMin, 1] |
| lMin | <code>number</code> | [0, 1] |
| lMax | <code>number</code> | [lMin, 1] |


* * *

Copyright (c) 2016 YOPEY YOPEY LLC - MIT License - Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)