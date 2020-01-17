# Texting Squirrel
Module to format texts with variables and functions. It supports multiple dictionaries.

## Installation
```bash
$ npm install texting-squirrel
```

## Usage
```javascript
import Text from 'texting-squirrel';

console.log(Text.format('Hi, {0}!', 'developer')); // will output Hi, developer!

Text.addDictionary('test', { module_name: 'Texting Squirrel' });
Text.setDictionary('test');

console.log(Text.get('module_name')); // will output Texting Squirrel
console.log(Text.format('I am using {module_name} module')); // will output I am using Texting Squirrel
```

## Text functions
Functions can be registered to the module. The texts can be updated with those funtions

### count(index, a, b, c)
| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Index in the args of the format function |
| a | <code>string</code> | Text which will be returned if the value is equal to `1` |
| b | <code>string</code> | Text which will be returned if the value is equal to `2`, `3` or `4` |
| c | <code>string</code> | Text which will be returned if the value is equal to `0` or bigger than `4` |

### gender(index, a, b, c)
| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Index in the args of the format function |
| a | <code>string</code> | Text which will be returned if the value is equal to `male` | 
| b | <code>string</code> | Text which will be returned if the value is equal to `female` |
| c | <code>string</code> | Text which will be returned if the value is not defined or something else than `male` or `female` |

```javascript
import Text from 'texting-squirrel';

console.log(Text.format('{count(0, script, scripts, scripts)}', 5)); // will output 5 scripts
console.log(Text.format('{gender(0, He, She, He/She)} codes', 'female')); // will output She codes
```

### Custom functions
Custom functions can be registered and called

```javascript
Text.addFunction('date', () => new Date().toISOString());
console.log(Text.format('{date()}')); // will output [actual date in iso format]
```

## TODO
- passing JSON in the text -> every text in braces is cleared

## Functions

<dl>
<dt><a href="#addDictionary">addDictionary(key, [dictionary])</a> ⇒ <code>Text</code></dt>
<dd><p>Adds the new dictionary.</p>
</dd>
<dt><a href="#getDictionary">getDictionary(key)</a> ⇒ <code>Dictionary</code></dt>
<dd><p>Gets the dictionary by the key.</p>
</dd>
<dt><a href="#setDictionary">setDictionary(key)</a> ⇒ <code>Text</code></dt>
<dd><p>Sets the actual dictionary.</p>
</dd>
<dt><a href="#addFunction">addFunction(name, fn)</a> ⇒ <code>Text</code></dt>
<dd><p>Adds the function.</p>
</dd>
<dt><a href="#get">get(key, ...args)</a> ⇒ <code>string</code></dt>
<dd><p>Formats the text from the set dictionary. The text is searched as a value in the dictionary by defined key. If the key is not found in set dictionary it tries to find the text in default dictionary.</p>
</dd>
<dt><a href="#format">format(text, ...args)</a> ⇒ <code>string</code></dt>
<dd><p>Formats the text. Data to format must be in braces.
If there&#39;s a number in braces the value to replace is searched in the args by order in array.
If it&#39;s a function in the braces the function is called. First parameter accepts number and it&#39;s searched in the args.
It it&#39;s a string in the braces the value to replace is searched in the set dictionary.</p>
</dd>
</dl>

<a name="addDictionary"></a>

## addDictionary(key, [dictionary]) ⇒ <code>Text</code>
Adds the new dictionary.

**Kind**: global function
**Returns**: <code>Text</code> - Instance of the Text class.

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> \| <code>Object.&lt;string, string&gt;</code> | Key with which is the dictionary accesible to format texts. If it's an object, the key is default. |
| [dictionary] | <code>Object.&lt;string, string&gt;</code> | Key-value object for mapping the texts. |

<a name="getDictionary"></a>

## getDictionary(key) ⇒ <code>Dictionary</code>
Gets the dictionary by the key.

**Kind**: global function
**Returns**: <code>Dictionary</code> - Dictionary instance or null.

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key of the dictionary. |

<a name="setDictionary"></a>

## setDictionary(key) ⇒ <code>Text</code>
Sets the actual dictionary.

**Kind**: global function
**Returns**: <code>Text</code> - Instance of the Text class.

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key fo the dictionary. |

<a name="addFunction"></a>

## addFunction(name, fn) ⇒ <code>Text</code>
Adds the function.

**Kind**: global function
**Returns**: <code>Text</code> - Instance of the Text class.

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the function. |
| fn | <code>function</code> | Function to execute. |

<a name="get"></a>

## get(key, ...args) ⇒ <code>string</code>
Formats the text from the set dictionary. The text is searched as a value in the dictionary by defined key. If the key is not found in set dictionary it tries to find the text in default dictionary.

**Kind**: global function
**Returns**: <code>string</code> - Formatted text.

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key of the text in the dictionary. |
| ...args | <code>\*</code> | Arguments to pass in format method. |

<a name="format"></a>

## format(text, ...args) ⇒ <code>string</code>
If there's a number in braces the value to replace is searched in the args by orIf it's a function in the braces the function is called. First parameter acceptsIt it's a string in the braces the value to replace is searched in the set dictionary.

**Kind**: global function
**Returns**: <code>string</code> - Formatted text.

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Text to format. |
| ...args | <code>\*</code> | Arguments to pass in the text by index. |

**Example** *(Passing variables)*
```js
Text.format('{0}', 'one'); // returns one
Text.format('{0} {1} {2}', 'one', 'two', 'three'); // returns one two three
```
**Example** *(Count function)*
```js
Text.format('{count(0, script, scripts, scripts)}', 5); // returns 5 scripts
```
**Example** *(Gender function)*
```js
Text.format('{gender(0, He, She, He/She)} codes', 'female'); //returns She codes
```

