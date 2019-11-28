import { expect } from 'chai';

import Text from '../src';

describe('Base functions', () => {

	it('formats the text without any variables', () => {
		expect(Text.format('Test test test')).to.be.equal('Test test test');
	});

	it('formats the text with one variable', () => {
		expect(Text.format('Test test {0}', 'test')).to.be.equal('Test test test');
	});

	it('formats the text with one variable without a parameter', () => {
		expect(Text.format('Test test {0}')).to.be.equal('Test test ');
	});

	it('formats the text with two variables', () => {
		expect(Text.format('Test {0} {1}', 'test', 'test')).to.be.equal('Test test test');
	});

	it('formats the text with two variables and reversed order', () => {
		expect(Text.format('Test {1} {0}', 'first', 'second')).to.be.equal('Test second first');
	});

	it('formats the text with two variables which are not set', () => {
		expect(Text.format('First parameter: {0}; Second parameter: {1};')).to.be.equal('First parameter: ; Second parameter: ;');
	});
});

describe('Built-in functions', () => {

	describe('count', () => {

		it('formats the text with count function', () => {
			expect(Text.format('{count(0,test,tests,tests)}', 0)).to.be.equal('0 tests');
			expect(Text.format('{count(0,test,tests,tests)}', 1)).to.be.equal('1 test');
			expect(Text.format('{count(0,test,tests,tests)}', 2)).to.be.equal('2 tests');
			expect(Text.format('{count(0,test,tests,tests)}', 5)).to.be.equal('5 tests');
			expect(Text.format('{count(0,test,testify,tests)}', 4)).to.be.equal('4 testify');
			// TODO poslat stringy
		});

		it('formats the text with multiple count functions', () => {
			expect(Text.format('{count(0,test,tests,tests)} {count(1,test,tests,tests)} {count(2,test,tests,tests)}', 1, 2, 4)).to.be.equal('1 test 2 tests 4 tests');
		});
	});

	describe('gender', () => {

		it('formats the text with gender function', () => {
			expect(Text.format('{gender(0,He,She,He/She)} is trying to learn javascript', 'male')).to.be.equal('He is trying to learn javascript');
			expect(Text.format('{gender(0,He,She,He/She)} is trying to learn javascript', 'female')).to.be.equal('She is trying to learn javascript');
			expect(Text.format('{gender(0,He,She,He/She)} is trying to learn javascript', 'both')).to.be.equal('He/She is trying to learn javascript');
			expect(Text.format('{gender(0,He,She,He/She)} is trying to learn javascript', null)).to.be.equal('He/She is trying to learn javascript');
			expect(Text.format('{gender(0,He,She,He/She)} is trying to learn javascript')).to.be.equal('He/She is trying to learn javascript');
		});

		it('formats the text with multiple gender functions', () => {
			expect(Text.format('{gender(0,He,She,He/She)} has to read {gender(1,his,her,his/her)} book', 'male', 'female')).to.be.equal('He has to read her book');
		});
	});

	it('formats the text using count and gender functions', () => {
		expect(Text.format('{gender(0,He,She,He/She)} is learning {count(1,language,languages,languages)}', 'male', 2)).to.be.equal('He is learning 2 languages');
	});

	it('tries to format the text with invalid function', () => {
		expect(Text.format('{test(0)}', 'test')).to.be.equal('');
	});
});

describe('Custom functions', () => {

	it('adds date function and formats text with it', () => {
		Text.addFunction('date', (d = '2018-02-22 22:22:22') => new Date(d).toISOString());
		expect(Text.format('{date()}')).to.be.equal('2018-02-22T21:22:22.000Z');
		expect(Text.format('{date(2018-02-23 23:23:23)}')).to.be.equal('2018-02-23T22:23:23.000Z');
	});

    /*it('adds json function and formats text with it', () => {
        Text.addFunction('json', (o) => {
            console.log(JSON.stringify(o));
            return JSON.stringify(o);
        });
        expect(Text.format('{json(0)}', { key: 'value' })).to.be.equal('{"key":"value"}');
    });*/
});

describe('Dictionaries', () => {

	Text.addDictionary({
		key: 'KEY',
		variable: 'VARIABLE {0}',
		relation: 'RELATION {key}',
		relation_variable: 'RELATION {variable}',
		fn_count: '{count(0,variable, variables, variables)}',
		fn_gender: '{gender(0,His,Her,His/Her)} variable'
	});

	it('tries to get the text from non existing dictionary', () => {
		expect(Text.get('non_existing')).to.be.equal('');
	});

	it('gets the values from dictionary', () => {
		expect(Text.get('key')).to.be.equal('KEY');
		expect(Text.get('variable', 5)).to.be.equal('VARIABLE 5');
		expect(Text.get('relation')).to.be.equal('RELATION KEY');
		expect(Text.get('relation_variable', 6)).to.be.equal('RELATION VARIABLE 6');
		expect(Text.get('fn_count', 3)).to.be.equal('3 variables');
		expect(Text.get('fn_gender', 'female')).to.be.equal('Her variable');
	});

	it('formats the text using format method and the key in dictionary', () => {
		expect(Text.format('The key is {key}')).to.be.equal('The key is KEY');
	});

	it('adds custom dictionary and gets its values', () => {
		Text.addDictionary('custom', { key: 'key' });
		Text.setDictionary('custom');
		expect(Text.get('key')).to.be.equal('key');
		expect(Text.get('variable', 5)).to.be.equal('VARIABLE 5');
		expect(Text.get('relation')).to.be.equal('RELATION key');
		expect(Text.get('relation_variable', 6)).to.be.equal('RELATION VARIABLE 6');
		expect(Text.get('fn_count', 3)).to.be.equal('3 variables');
		expect(Text.get('fn_gender', 'female')).to.be.equal('Her variable');
	});

});