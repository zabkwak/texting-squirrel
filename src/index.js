import Text from './text';

export default new Text()
    .addFunction('count', (count, a, b, c) => {
        if (count === 1) {
            return `${count} ${a}`;
        }
        if (count > 4 || count === 0) {
            return `${count} ${c}`;
        }
        return `${count} ${b}`;
    }).addFunction('gender', (gender, a, b, c) => {
        switch (gender) {
            case 'male': return a;
            case 'female': return b;
            default: return c;
        }
    });