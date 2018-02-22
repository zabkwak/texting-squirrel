export default class Dictionary {

    static DEFAULT = 'default';

    /**
     * 
     * @param {string} key 
     * @param {Object.<string, string>} data 
     */
    constructor(key, data) {
        this._key = key;
        this._data = data;
    }

    /**
     * Checks if the value is in the dictionary.
     * 
     * @param {string} key 
     */
    hasValue(key) {
        return this.getValue(key) !== null;
    }

    /**
     * Checks if the dictionary is default.
     */
    isDefault() {
        return this.getKey() === this.constructor.DEFAULT;
    }

    /**
     * Gets the key of the dictionary.
     */
    getKey() {
        return this._key;
    }

    /**
     * Gets the value of the key in dictionary.
     * 
     * @param {string} key 
     */
    getValue(key) {
        return this._data[key] || null;
    }
}