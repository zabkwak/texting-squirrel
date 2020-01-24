import Text from './text';

export type TextType = Text;

export default new Text()
	.addFunction('count', (count: number, a: string, b: string, c: string) => {
		if (count === 1) {
			return `${count} ${a}`;
		}
		if (count > 4 || count === 0) {
			return `${count} ${c}`;
		}
		return `${count} ${b}`;
	}).addFunction('gender', (gender: string, a: string, b: string, c: string) => {
		switch (gender) {
			case 'male': return a;
			case 'female': return b;
			default: return c;
		}
	});
