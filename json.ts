import { lex } from "./lexical/lex.ts";
import parser from "./parser/parser.ts";

export function to_json(input: string) {
	const token = lex(input);
	return parser(token).result;
}