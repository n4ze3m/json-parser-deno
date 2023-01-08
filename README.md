# JSON parser in TypeScript


After reading [Writing a simple JSON parser](https://notes.eatonphil.com/writing-a-simple-json-parser.html) by Phil Eaton, I decided to write a JSON parser in TypeScript using Deno as a runtime.


## Usage

```bash
deno run -A .\index.ts
```

In `index.ts`, I added a simple simple api request to fetch the data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/) and parse the response using `to_json()` function from `json.ts`.