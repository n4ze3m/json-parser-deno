import {
	JSON_COLON,
	JSON_COMMA,
	JSON_LEFT_BRACE,
	JSON_LEFT_BRACKET,
	JSON_RIGHT_BRACE,
	JSON_RIGHT_BRACKET,
} from "../constants/index.ts";
import { LexResultArray, ParserResult } from "../@types/types.ts";

function parse_object(tokens: LexResultArray): ParserResult {
	let result: Record<string, unknown> = {};
	let t = tokens[0];

	if (t === JSON_RIGHT_BRACE) {
		return {
			result,
			rest: tokens.slice(1),
		};
	}

	while (true) {
		let key = tokens[0];
		if (typeof key === "string") {
			tokens = tokens.slice(1);
		} else {
			throw new Error("Invalid JSON");
		}

		if (tokens[0] !== JSON_COLON) {
			throw new Error("Invalid JSON");
		}

		let { result: value, rest: tokensAfterValue } = parser(tokens.slice(1));

		result[key] = value;
		if (tokensAfterValue.length === 0) {
			return {
				result,
				rest: tokensAfterValue,
			};
		} else {
			t = tokensAfterValue[0];

			if (t === JSON_RIGHT_BRACE) {
				return {
					result,
					rest: tokensAfterValue.slice(1),
				};
			} else if (t !== JSON_COMMA) {
				throw new Error("Invalid JSON");
			}

			tokens = tokensAfterValue.slice(1);
		}
	}
}

function parse_array(tokens: LexResultArray): ParserResult {
	const result: unknown[] = [];
	let t = tokens[0];

	while (true) {
		let { result: value, rest: tokensAfterValue } = parser(tokens);
		result.push(value);

		if (tokensAfterValue.length === 0) {
			return {
				result,
				rest: tokensAfterValue,
			};
		} else {
			t = tokensAfterValue[0];

			if (t === JSON_RIGHT_BRACKET) {
				return {
					result,
					rest: tokensAfterValue.slice(1),
				};
			} else if (t !== JSON_COMMA) {
				console.log(t);
				throw new Error("Invalid JSON");
			} else {
				tokens = tokensAfterValue.slice(1);
			}
		}
	}
}

function parser(tokens: LexResultArray, isRoot: boolean = false): ParserResult {
	let token = tokens[0];

	if (isRoot && token !== JSON_LEFT_BRACE) {
		throw new Error("Invalid JSON - must be an object");
	}

	if (token === JSON_LEFT_BRACKET) {
		return parse_array(tokens.slice(1));
	} else if (token === JSON_LEFT_BRACE) {
		return parse_object(tokens.slice(1));
	}

	return {
		result: token,
		rest: tokens.slice(1),
	};
}

export default parser;