import { assertEquals } from "https://deno.land/std@0.171.0/testing/asserts.ts";
import { lex } from "./lex.ts";

Deno.test("String", () => {
	assertEquals(lex('{ "a": "b" }'), ["{", "a", ":", "b", "}"]);
});


Deno.test("Number", () => {
    assertEquals(lex('{ "a": 1 }'), ["{", "a", ":", 1, "}"]);
});

Deno.test("Boolean", () => {
    assertEquals(lex('{ "a": true }'), ["{", "a", ":", true, "}"]);
});

Deno.test("Null", () => {
    assertEquals(lex('{ "a": null }'), ["{", "a", ":", null, "}"]);
});


Deno.test("Array", () => {
    assertEquals(lex('{ "a": [1, 2, 3] }'), ["{", "a", ":", "[", 1, ",", 2, ",", 3, "]", "}"]);
});