export type LexResult = {
	result: string | number | boolean | null;
	rest: string;
};

export type ParserResult = {
    result: Record<string, unknown> | unknown[] | unknown;
    rest: LexResultArray;
};

export type LexResultArray = Array<string | number | boolean | null>;
