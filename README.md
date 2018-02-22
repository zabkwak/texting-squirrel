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
Custom fuctions can be registered and called

```javascript
Text.addFunction('date', () => new Date().toISOString());
console.log(Text.format('{date()}')); // will output [actual date in iso format]
```

## TODO
- passing JSON in the text -> every text in braces is cleared

## Functions

<dl>
<dt><a href="#addDictionary">addDictionary(key, [dictionary])</a></dt>
<dd><p>Adds the new dictionary.</p>
</dd>
<dt><a href="#getDictionary">getDictionary(key)</a></dt>
<dd><p>Gets the dictionary by the key.</p>
</dd>
<dt><a href="#setDictionary">setDictionary(key)</a></dt>
<dd><p>Sets the actual dictionary.</p>
</dd>
<dt><a href="#addFunction">addFunction(key, fn)</a></dt>
<dd><p>Adds the function.</p>
</dd>
<dt><a href="#get">get(key, ...args)</a></dt>
<dd><p>Formats the text from the set dictionary. The text is searched as a value in the dictionary by defined key. If the key is not found in set dictionary it tries to find the text in default dictionary.</p>
</dd>
<dt><a href="#format">format(text, ...args)</a> ⇒ <code>string</code></dt>
<dd><p>Formats the text. Data to format must be in braces.
If there&#39;s a number in braces the value to replace is searched in the args by order in array.
If it&#39;s a function in the braces the function is called. First parameter accepts number and it&#39;s searched in the args.
It it&#39;s a string in the braces the value to replace is searched in the set dictionary.</p>
</dd>
<dt><a href="#hasValue">hasValue(key)</a></dt>
<dd><p>Checks if the value is in the dictionary.</p>
</dd>
<dt><a href="#isDefault">isDefault()</a></dt>
<dd><p>Checks if the dictionary is default.</p>
</dd>
<dt><a href="#getKey">getKey()</a></dt>
<dd><p>Gets the key of the dictionary.</p>
</dd>
<dt><a href="#getValue">getValue(key)</a></dt>
<dd><p>Gets the value of the key in dictionary.</p>
</dd>
</dl>

<a name="addDictionary"></a>

## addDictionary(key, [dictionary])
Adds the new dictionary.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> \| <code>Object.&lt;string, string&gt;</code> | Key with which is the dictionary accesible to format texts. If it's an object, the key is default. |
| [dictionary] | <code>Object.&lt;string, string&gt;</code> | Key-value object for mapping the texts. |

<a name="getDictionary"></a>

## getDictionary(key)
Gets the dictionary by the key.

**Kind**: global function

| Param | Type |
| --- | --- |
| key | <code>string</code> |

<a name="setDictionary"></a>

## setDictionary(key)
Sets the actual dictionary.

**Kind**: global function

| Param | Type |
| --- | --- |
| key | <code>string</code> |

<a name="addFunction"></a>

## addFunction(key, fn)
Adds the function.

**Kind**: global function

| Param | Type |
| --- | --- |
| key | <code>string</code> |
| fn | <code>function</code> |

<a name="get"></a>

## get(key, ...args)
Formats the text from the set dictionary. The text is searched as a value in the dictionary by defined key. If the key is not found in set dictionary it tries to find the text in default dictionary.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key of the text in the dictionary. |
| ...args | <code>\*</code> | Arguments to pass in format method. |

<a name="format"></a>

## format(text, ...args) ⇒ <code>string</code>
If there's a number in braces the value to replace is searched in the args by orIf it's a function in the braces the function is called. First parameter acceptsIt it's a string in the braces the value to replace is searched in the set dictionary.

**Kind**: global function

| Param | Type |
| --- | --- |
| text | <code>string</code> |
| ...args | <code>\*</code> |

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
<a name="hasValue"></a>

## hasValue(key)
Checks if the value is in the dictionary.

**Kind**: global function

| Param | Type |
| --- | --- |
| key | <code>string</code> |

<a name="isDefault"></a>

## isDefault()
Checks if the dictionary is default.

**Kind**: global function
<a name="getKey"></a>

## getKey()
Gets the key of the dictionary.

**Kind**: global function
<a name="getValue"></a>

## getValue(key)
Gets the value of the key in dictionary.

**Kind**: global function

| Param | Type |
| --- | --- |
| key | <code>string</code> |
