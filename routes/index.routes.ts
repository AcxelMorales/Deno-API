import { Router } from "https://deno.land/x/oak/mod.ts";

import * as idxCtrl from "../controllers/index.controller.ts";

const router = new Router();

router.get("/", ({ response }) => {
  response.body = 'Welcome to my Api';
  response.status = 200;
});

router.get("/users", idxCtrl.getUsers);

router.get("/users/:id", idxCtrl.getUser);

router.post("/users", idxCtrl.createUser);

router.put("/users/:id", idxCtrl.updateUser);

router.delete("/users/:id", idxCtrl.deleteUser);

export default router;
