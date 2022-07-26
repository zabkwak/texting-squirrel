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

### Mode
The text module can be set in two modes `production` or `dev` with `setMode` method. In the `dev` mode warnings are logged in console and if the text is not found in dictionary the key is returned instead of empty string.

## Text functions
Functions can be registered to the module. The texts can be updated with those functions.

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

## Docs
Checkout the documentation [here](https://zabkwak.github.io/texting-squirrel/).

## TODO
- passing JSON in the text -> every text in braces is cleared


