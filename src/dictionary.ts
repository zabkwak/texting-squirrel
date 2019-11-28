export default class Dictionary {

	public static DEFAULT = 'default';

	private _key: string;
	private _data: { [key: string]: string };

	constructor(key: string, data: { [key: string]: string }) {
		this._key = key;
		this._data = data;
	}

	/**
	 * Checks if the value is in the dictionary.
	 *
	 * @param key
	 */
	public hasValue(key: string): boolean {
		return this.getValue(key) !== null;
	}

	/**
	 * Checks if the dictionary is default.
	 */
	public isDefault(): boolean {
		return this.getKey() === Dictionary.DEFAULT;
	}

	/**
	 * Gets the key of the dictionary.
	 */
	public getKey(): string {
		return this._key;
	}

	/**
	 * Gets the value of the key in dictionary.
	 *
	 * @param key
	 */
	public getValue(key: string): string {
		return this._data[key] || null;
	}
}
