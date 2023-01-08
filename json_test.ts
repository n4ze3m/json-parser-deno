import { assertEquals } from "https://deno.land/std@0.171.0/testing/asserts.ts";
import { to_json } from "./json.ts";

Deno.test("Object", () => {
	assertEquals(to_json(`{"a":1}`), { a: 1 });
});

Deno.test("Array", () => {
	assertEquals(to_json(`{"a":[1,2,3]}`), { a: [1, 2, 3] });
});

Deno.test("Nested Object", () => {
	assertEquals(to_json(`{"a":{"b":1}}`), { a: { b: 1 } });
});

Deno.test("Nested Array", () => {
	assertEquals(to_json(`{"a":[1,[2,3]]}`), { a: [1, [2, 3]] });
});

Deno.test("Nested Object and Array", () => {
	assertEquals(to_json(`{"a":{"b":[1,2,3]}}`), { a: { b: [1, 2, 3] } });
});
