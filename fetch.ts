window.addEventListener("load", () => {
    console.log("LOAD...");
});

window.addEventListener("unload", () => {
    console.log("UNLOAD!!!");
})
const url = Deno.args[0];
console.log("Making request to url = ", url)
const data = await fetch(url);
const response = await data.json()
console.log(response);

await Deno.writeFile("data.json", new TextEncoder().encode(JSON.stringify(response)))
// 'https://jsonplaceholder.typicode.com/todos/1'