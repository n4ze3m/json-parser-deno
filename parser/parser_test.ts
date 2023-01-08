import { assertEquals } from "https://deno.land/std@0.171.0/testing/asserts.ts";
import parser from "./parser.ts";

Deno.test("Object", () => {
	const token = ["{", "a", ":", 1, "}"];
	assertEquals(parser(token).result, { a: 1 });
});


Deno.test("Array", () => {
    const token = ["{", "a", ":", "[", 1, ",", 2, ",", 3, "]", "}"];
    assertEquals(parser(token).result, { a: [1, 2, 3] });
});


Deno.test("Nested Object", () => {
    const token = ["{", "a", ":", "{", "b", ":", 1, "}", "}"];
    assertEquals(parser(token).result, { a: { b: 1 } });
});

Deno.test("Nested Array", () => {
    const token = ["{", "a", ":", "[", 1, ",", "[", 2, ",", 3, "]", "]", "}"];
    assertEquals(parser(token).result, { a: [1, [2, 3]] });
}); 

Deno.test("Nested Object and Array", () => {
    const token = ["{", "a", ":", "{", "b", ":", "[", 1, ",", 2, ",", 3, "]", "}", "}"];
    assertEquals(parser(token).result, { a: { b: [1, 2, 3] } });
});
