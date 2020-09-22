// deno-lint-ignore-file
import type {User} from "./interfaces.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import type { RouterMiddleware } from "https://deno.land/x/oak@v6.2.0/router.ts";
let users: User[] = [
    {id: "1", name: "Dron"},
    {id: "2", name: "Brant"},
    {id: "3", name: "Eugenio"},
    {id: "4", name: "Archip"},
    {id: "5", name: "Condrat"}
];

export const getUserById = (ctx: { response: any; params: any; } ) => {
    const {response, params} = ctx;

    const user: User | undefined = users.find(u => u.id === params.id);

    if (user) {
        response.status = 200;
        response.body = user;
    } else {
        response.status = 404;
        response.body = {message: "User not fond!!!"};
    }
}

export const getUsers = ({ response} : { response: any }) => {
    response.body = users;
}

export const postUser = async(ctx: { response: any; request: any; }) => {
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
}

export const putUser = async(ctx: { response: any; request: any; params: any; }) => {
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
}

export const delUser = (ctx: { response: any; params: any; }) => {
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
}

