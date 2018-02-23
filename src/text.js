import Dictionary from './dictionary';

export default class Text {

    /**
     * @type {string}
     */
    _dictionary = Dictionary.DEFAULT;
    /**
     * @type {Object.<string, Dictionary>}
     */
    _dictionaries = {};

    /**
     * @type {Object.<string, Function>}
     */
    _functions = {};

    /**
     * Adds the new dictionary.
     * 
     * @param {string|Object.<string, string>} key Key with which is the dictionary accesible to format texts. If it's an object, the key is default.
     * @param {Object.<string, string>} [dictionary] Key-value object for mapping the texts.
     * @returns {Text} Instance of the Text class.
     */
    addDictionary(key, dictionary) {
        if (typeof key !== 'string') {
            dictionary = key;
            key = Dictionary.DEFAULT;
        }
        this._dictionaries[key] = new Dictionary(key, dictionary);
        return this;
    }

    /**
     * Gets the dictionary by the key.
     * 
     * @param {string} key Key of the dictionary.
     * @returns {Dictionary} Dictionary instance or null.
     */
    getDictionary(key = this._dictionary) {
        return this._dictionaries[key] || null;
    }

    /**
     * Sets the actual dictionary.
     * 
     * @param {string} key Key fo the dictionary.
     * @returns {Text} Instance of the Text class.
     */
    setDictionary(key) {
        if (!this._dictionaries[key]) {
            console.warn(`Dictionary with key '${key}' doesn't exist`);
            return;
        }
        this._dictionary = key;
        return this;
    }

    /**
     * Adds the function.
     * 
     * @param {string} name Name of the function.
     * @param {Function} fn Function to execute.
     * @returns {Text} Instance of the Text class.
     */
    addFunction(name, fn) {
        this._functions[name] = fn;
        return this;
    }

    /**
     * Formats the text from the set dictionary. The text is searched as a value in the dictionary by defined key. If the key is not found in set dictionary it tries to find the text in default dictionary.
     * 
     * @param {string} key Key of the text in the dictionary.
     * @param {...*} args Arguments to pass in format method.
     * @returns {string} Formatted text.
     */
    get(key, ...args) {
        let dictionary = this.getDictionary() || this.getDictionary(Dictionary.DEFAULT);
        if (!dictionary) {
            console.warn('No dictionary set');
            return '';
        }
        if (!dictionary.hasValue(key) && !dictionary.isDefault()) {
            dictionary = this.getDictionary(Dictionary.DEFAULT);
        }
        if (!dictionary.hasValue(key)) {
            console.warn(`Key '${key}' not found in dictionary '${dictionary.getKey()}'`);
            return '';
        }
        return this.format(dictionary.getValue(key), ...args);
    }

    /**
     * Formats the text. Data to format must be in braces. 
     * If there's a number in braces the value to replace is searched in the args by order in array.
     * If it's a function in the braces the function is called. First parameter accepts number and it's searched in the args.
     * It it's a string in the braces the value to replace is searched in the set dictionary.
     * 
     * @example <caption>Passing variables</caption>
     * Text.format('{0}', 'one'); // returns one
     * Text.format('{0} {1} {2}', 'one', 'two', 'three'); // returns one two three
     * 
     * @example <caption>Count function</caption>
     * Text.format('{count(0, script, scripts, scripts)}', 5); // returns 5 scripts
     * 
     * @example <caption>Gender function</caption>
     * Text.format('{gender(0, He, She, He/She)} codes', 'female'); //returns She codes
     * 
     * @param {string} text Text to format.
     * @param {...*} args Arguments to pass in the text by index.
     * @returns {string} Formatted text.
     */
    format(text, ...args) {
        if (!text) {
            return '';
        }
        const match = text.match(/{(.+?)\}/g);
        if (match !== null) {
            match.forEach((m) => {
                if (/{\d+}/.test(m)) {
                    const key = m.slice(1, -1);
                    if (args[key] !== undefined) {
                        text = text.replace(m, args[key]);
                    }
                } else if (/\w+\(.*\)/.test(m)) {
                    // TODO validate?
                    const fn = m.match(/(\w+)/)[0];
                    // TODO validate?
                    const params = m.match(/(\(.*\))/)[0].slice(1, -1).split(',').map((item) => item.trim());
                    if (params.length && !isNaN(params[0])) {
                        params[0] = args[params[0]];
                    }
                    const caller = this._functions[fn];
                    if (caller) {
                        text = text.replace(m, caller.apply(this, params));
                    } else {
                        console.warn(`Invalid function '${fn}'`);
                    }
                } else if (/{\w+}/.test(m)) {
                    text = text.replace(m, this.get(m.slice(1, -1), ...args));
                }
            });
        }
        return text.replace(/{(.+)\}/, '');
    }
}