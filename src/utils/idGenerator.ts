import {customAlphabet} from 'nanoid';
import {Alphabets} from '../types';

const idGenerator = (alphabets: Alphabets, length: number) => {
	switch (alphabets) {
		case Alphabets.ALPHA:
			return customAlphabet('abcdefghijklmopqrstuvwxyz', length)();
		case Alphabets.ALPHANUMERIC:
			return customAlphabet('abcdefghijklmopqrstuvwxyz123456789', length)();
		case Alphabets.NUMERIC:
			return customAlphabet('123456789', length)();
		case Alphabets.ALL:
			return customAlphabet(
				'abcdefghijklmopqrstuvwxyz123456789!@#$%^&*()?/><',
				length
			)();
		default:
			return customAlphabet(
				'abcdefghijklmopqrstuvwxyz123456789!@#$%^&*()?/',
				length
			)();
	}
};
export default idGenerator;
