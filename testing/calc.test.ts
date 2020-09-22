import {sub, sum} from "./calc.ts";
import {assertEquals} from "./dependencies.ts";

Deno.test("Sum functions", () => {
    const result = sum(41, 1);

    assertEquals(result, 42);
});

Deno.test("Sub functions", () => {
    const result = sub(41, 1);

    assertEquals(result, 40);
});