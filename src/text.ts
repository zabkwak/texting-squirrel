import Dictionary from './dictionary';

export type TMode = 'dev' | 'production';

export default class Text {

	private _dictionary: string = Dictionary.DEFAULT;

	private _dictionaries: { [key: string]: Dictionary } = {};

	private _functions: { [key: string]: (...args: any[]) => string } = {};

	private _mode: TMode = 'dev';

	/**
	 * Sets the mode of the module.
	 *
	 * If the app is in `dev` mode, warnings are logged to `console` and not-existing texts are returned as the key.
	 * Otherwise in `production` mode no logs are printed and non-existing texts are returned as empty string.
	 *
	 * @param mode The mode to set one of `dev` or `production`. Default is `dev`.
	 * @returns Instance of the Text class.
	 */
	public setMode(mode: TMode): this {
		this._mode = mode;
		return this;
	}

	/**
	 * Gets the current mode of the Text class.
	 *
	 * @returns The current mode of the Text class.
	 */
	public getMode(): TMode {
		return this._mode;
	}

	/**
	 * Adds the new dictionary.
	 *
	 * @param  key Key with which is the dictionary accessible to format texts. If it's an object, the key is default.
	 * @param dictionary Key-value object for mapping the texts.
	 * @returns Instance of the Text class.
	 */
	public addDictionary(key: string | { [key: string]: string }, dictionary?: { [key: string]: string }): this {
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
	 * @param key Key of the dictionary.
	 * @returns Dictionary instance or null.
	 */
	public getDictionary(key: string = this._dictionary): Dictionary {
		return this._dictionaries[key] || null;
	}

	/**
	 * Sets the actual dictionary.
	 *
	 * @param key Key fo the dictionary.
	 * @returns Instance of the Text class.
	 */
	public setDictionary(key: string): this {
		if (!this._dictionaries[key]) {
			this._warn(`Dictionary with key '${key}' doesn't exist`);
			return this;
		}
		this._dictionary = key;
		return this;
	}

	/**
	 * Adds the function.
	 *
	 * @param name Name of the function.
	 * @param fn Function to execute.
	 * @returns Instance of the Text class.
	 */
	public addFunction(name: string, fn: (...args: any[]) => string): this {
		this._functions[name] = fn;
		return this;
	}

	/**
	 * Formats the text from the set dictionary. The text is searched as a value in the dictionary by defined key.
	 * If the key is not found in set dictionary it tries to find the text in default dictionary.
	 *
	 * @param key Key of the text in the dictionary.
	 * @param args Arguments to pass in format method.
	 * @returns Formatted text.
	 */
	public get(key: string, ...args: any[]): string {
		let dictionary = this.getDictionary() || this.getDictionary(Dictionary.DEFAULT);
		if (!dictionary) {
			this._warn('No dictionary set');
			return '';
		}
		if (!dictionary.hasValue(key) && !dictionary.isDefault()) {
			dictionary = this.getDictionary(Dictionary.DEFAULT);
		}
		if (!dictionary.hasValue(key)) {
			this._warn(`Key '${key}' not found in dictionary '${dictionary.getKey()}'`);
			return this._mode === 'production'
				? ''
				: `[${key}]`;
		}
		return this.format(dictionary.getValue(key), ...args);
	}

	/**
	 * Formats the text from the defined dictionary.
	 * The text is not searched in the default dictionary if not found.
	 *
	 * @param dictionaryKey Dictionary key.
	 * @param key Key of the text in the dictionary.
	 * @param args Arguments to pass in format method.
	 * @returns Formatted text.
	 */
	public getFromDictionary(dictionaryKey: string, key: string, ...args: any[]): string {
		const dictionary = this.getDictionary(dictionaryKey);
		if (!dictionary) {
			throw new Error(`Dictionary '${dictionaryKey}' doesn't exist.`);
		}
		if (!dictionary.hasValue(key)) {
			this._warn(`Key '${key}' not found in dictionary '${dictionary.getKey()}'`);
			return this._mode === 'production'
				? ''
				: `[${key}]`;
		}
		return this.format(dictionary.getValue(key), ...args);
	}

	/**
	 * Formats the text. Data to format must be in braces.
	 * If there's a number in braces the value to replace is searched in the args by order in array.
	 * If it's a function in the braces the function is called.
	 * First parameter accepts number and it's searched in the args.
	 * It it's a string in the braces the value to replace is searched in the set dictionary.
	 *
	 * @example
	 * ```javascript
	 * Text.format('{0}', 'one'); // returns one
	 * Text.format('{0} {1} {2}', 'one', 'two', 'three'); // returns one two three
	 * ```
	 *
	 * @example
	 * ```javascript
	 * Text.format('{count(0, script, scripts, scripts)}', 5); // returns 5 scripts
	 * ```
	 *
	 * @example
	 * ```javascript
	 * Text.format('{gender(0, He, She, He/She)} codes', 'female'); //returns She codes
	 * ```
	 *
	 * @param text Text to format.
	 * @param args Arguments to pass in the text by index.
	 * @returns Formatted text.
	 */
	public format(text: string, ...args: any[]): string {
		if (!text) {
			return '';
		}
		const match = text.match(/{(.+?)\}/g);
		if (match !== null) {
			match.forEach((m) => {
				if (/{\d+}/.test(m)) {
					const key: any = m.slice(1, -1);
					if (args[key] !== undefined) {
						text = text.replace(m, args[key]);
					}
				} else if (/\w+\(.*\)/.test(m)) {
					// TODO validate?
					const fn = m.match(/(\w+)/)[0];
					// TODO validate?
					const params: any[] = m.match(/(\(.*\))/)[0].slice(1, -1).split(',').map((item) => item.trim());
					if (params.length && !isNaN(params[0])) {
						params[0] = args[params[0]];
					}
					const caller = this._functions[fn];
					if (caller) {
						text = text.replace(m, caller.apply(this, params));
					} else {
						this._warn(`Invalid function '${fn}'`);
					}
				} else if (/{\w+}/.test(m)) {
					text = text.replace(m, this.get(m.slice(1, -1), ...args));
				}
			});
		}
		return text.replace(/{(.+?)\}/g, '');
	}

	private _warn(message: any, ...optionalParams: any[]): void {
		if (this._mode === 'production') {
			return;
		}
		console.warn(message, ...optionalParams);
	}
}
