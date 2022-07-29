export default class Dictionary<T = any> {

	public static DEFAULT = 'default';

	private _key: string;
	private _data: Record<keyof T, string>;

	constructor(key: string, data: Record<keyof T, string>) {
		this._key = key;
		this._data = data;
	}

	/**
	 * Checks if the value is in the dictionary.
	 *
	 * @param key
	 */
	public hasValue<K extends keyof T>(key: K): boolean {
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
	public getValue<K extends keyof T>(key: K): string {
		return this._data[key] || null;
	}
}
