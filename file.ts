import {qrcode} from "https://deno.land/x/qrcode@v2.0.0/mod.ts";

const img = await qrcode("http://dron-short-links.ru/");

const encoder = new TextEncoder();

const data = encoder.encode(`<img src="${img}" alt="qrcode"/>`);

await Deno.writeFile("qrcode.html", data);