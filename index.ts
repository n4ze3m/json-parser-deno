import { to_json } from "./json.ts";
let resp = await fetch("https://jsonplaceholder.typicode.com/todos/1");
let data = await resp.text();
const json = to_json(data);
console.log(json);