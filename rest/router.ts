import { Router } from "https://deno.land/x/oak/mod.ts";
import {getUserById, getUsers, postUser, putUser, delUser} from "./controller.ts";

export const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = "HELLO OAK!!!";
});

router.get("/api/user/:id", getUserById)
.get("/api/users", getUsers)
.post("/api/users", postUser)
.put("/api/user/:id", putUser)
.delete("/api/user/:id", delUser);
