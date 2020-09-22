const file = await Deno.open("data.json");

await Deno.copy(file, Deno.stdout);

Deno.close(1);