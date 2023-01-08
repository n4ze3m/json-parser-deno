import {
	JSON_QUOTE,
	FALSE_LENGTH,
	TRUE_LENGTH,
	NULL_LENGTH,
	JSON_WHITE_SPACE,
	JSON_SYNTAX,
} from "../constants/index.ts";
import { LexResult, LexResultArray } from "../@types/types.ts";

function lex_string(str: string): LexResult {
	let json_string = "";

	if (str[0] === JSON_QUOTE) {
		str = str.slice(1);
	} else {
		return {
			result: null,
			rest: str,
		};
	}

	for (const char of str) {
		if (char === JSON_QUOTE) {
			return {
				result: json_string,
				rest: str.slice(json_string.length + 1),
			};
		} else {
			json_string += char;
		}
	}

	throw new Error("Invalid JSON string");
}

function lex_number(str: string): LexResult {
	let json_number = "";
	const number_regex = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/;

	for (const char of str) {
		if (number_regex.test(char)) {
			json_number += char;
		} else {
			break;
		}
	}

	const reset = str.slice(json_number.length);

	if (json_number.length === 0) {
		return {
			result: null,
			rest: str,
		};
	}

	if (json_number.includes(".")) {
		return {
			result: parseFloat(json_number),
			rest: reset,
		};
	}

	return {
		result: parseInt(json_number),
		rest: reset,
	};
}

function lex_boolean(str: string): LexResult {
	let string_length = str.length;

	if (string_length >= TRUE_LENGTH && str.slice(0, TRUE_LENGTH) === "true") {
		return {
			result: true,
			rest: str.slice(TRUE_LENGTH),
		};
	} else if (
		string_length >= FALSE_LENGTH &&
		str.slice(0, FALSE_LENGTH) === "false"
	) {
		return {
			result: false,
			rest: str.slice(FALSE_LENGTH),
		};
	}

	return {
		result: null,
		rest: str,
	};
}

function lex_null(str: string): LexResult {
	let string_length = str.length;

	if (string_length >= NULL_LENGTH && str.slice(0, NULL_LENGTH) === "null") {
		return {
			result: true,
			rest: str.slice(NULL_LENGTH),
		};
	}

	return {
		result: null,
		rest: str,
	};
}

export function lex(str: string): LexResultArray {
	const tokens: LexResultArray = [];

	while (str.length > 0) {
		let { result: stringResult, rest: stringReset } = lex_string(str);
		str = stringReset;
		if (stringResult !== null) {
			tokens.push(stringResult);
			continue;
		}

		let { result: numberResult, rest: numberRest } = lex_number(str);
		str = numberRest;
		if (numberResult !== null) {
			tokens.push(numberResult);
			continue;
		}

		let { result: booleanResult, rest: booleanRest } = lex_boolean(str);
		str = booleanRest;
		if (booleanResult !== null) {
			tokens.push(booleanResult);
			continue;
		}

		let { result: nullResult, rest: nullRest } = lex_null(str);
		str = nullRest;
		if (nullResult !== null) {
			tokens.push(null);
			continue;
		}

		let c = str[0];
		if (JSON_WHITE_SPACE.includes(c)) {
			str = str.slice(1);
		} else if (JSON_SYNTAX.includes(c)) {
			tokens.push(c);
			str = str.slice(1);
		} else {
			throw new Error("Invalid JSON syntax");
		}
	}
	return tokens;
}
