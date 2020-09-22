import { parse, dayOfYear } from "https://deno.land/std/datetime/mod.ts";
const time = parse("01-20-2019 16:34", "MM-dd-yyyy hh:mm");
// output : new Date(2019, 0, 20, 16, 34)

console.log(time);
console.log(dayOfYear(new Date("2020-09-21T03:24:00")));
