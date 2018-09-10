declare module 'texting-squirrel' {

    class Dictionary {
        static readonly DEFAULT = 'default';

        constructor(key: string, data: { [key: string]: string });

        hasValue(key: string): boolean;

        isDefault(): boolean;

        getKey(): string;

        getValue(string: key): string;
    }

    class Text {

        addDictionary(dictionary: { [key: string]: string }): this;
        addDictionary(key: string, dictionary: { [key: string]: string }): this;

        getDictionary(): Dictionary;
        getDictionary(key: string): Dictionary;

        setDictionary(key: string): this;

        addFunction(name: string, fn: (...args: any[]) => string): this;

        get(key: string): string;
        get(key: string, ...args: any[]): string;

        format(text: string, ...args: any[]): string;
    }

    const T: Text;
    export default T;
}