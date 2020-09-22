import type { User} from './interfaces.ts';
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
const port = 5000;
const app = new Application();
const router = new Router();

let users: User[] = [
    {id: "1", name: "Dron"},
    {id: "2", name: "Brant"},
    {id: "3", name: "Eugenio"},
    {id: "4", name: "Archip"},
    {id: "5", name: "Condrat"}
];

router.get("/", (ctx) => {
    ctx.response.body = "HELLO OAK!!!";
});

router.get("/api/user/:id", (ctx) => {
    const {response, params} = ctx;

    const user: User | undefined = users.find(u => u.id === params.id);

    if (user) {
        response.status = 200;
        response.body = user;
    } else {
        response.status = 404;
        response.body = {message: "User not fond!!!"};
    }
})
.get("/api/users", (ctx) => {
    ctx.response.body = users;
})
.post("/api/users", async(ctx) => {
    const {response, request} = ctx;

    const body = await request.body();

    if (!request.hasBody) {
        response.status = 400;
        response.body = {message: "Invalid data!!!"}
    } else {
        const user: User = await body.value as User;
        console.log("RESPONSE: ", user);
        user.id =  v4.generate(); 
        users.push(user);
        response.status = 201;
        response.body = {user};
    }
})
.put("/api/user/:id", async(ctx) => {
    const {response, request, params} = ctx;
    const user: User | undefined = users.find(u => u.id === params.id);

    if (user) {
        const body = await request.body().value;
        users = users.map(u => u.id === user.id ? {...u, ...body} : u);
        response.status = 201;
        response.body = {users};
    } else {
        response.status = 404;
        response.body = {message: "user not found!!!"};
    }
})
.delete("/api/user/:id", (ctx) => {
    const {response, params} = ctx;
    const user: User | undefined = users.find(u => u.id === params.id);

    if (user) {
        users = users.filter(u => u.id !== user.id);
        response.status = 201;
        response.body = {users};
    } else {
        response.status = 404;
        response.body = {message: "user not found!!!"};
    }
});
        
app.use(router.routes());

console.log(`App has been started on port ${port}...`);

await app.listen({port});

