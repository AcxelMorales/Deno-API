import { Response, Request, RouteParams as Params } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface User {
  id: string;
  name: string;
};

export let usersDB: User[] = [
  { id: "1", name: "Test 1" },
  { id: "2", name: "Test 2" },
  { id: "3", name: "Test 3" },
  { id: "4", name: "Test 4" },
  { id: "5", name: "Test 5" },
  { id: "6", name: "Test 6" }
];

const response404: { ok: boolean, message: string } = {
  ok: false,
  message: "User not found"
};

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    ok: true,
    usersDB
  };
};

export const getUser = ({ response, params }: { response: Response, params: { id: string } }) => {
  const userFound = usersDB.find(userDB => userDB.id === params.id);

  if (userFound) {
    response.status = 200;
    response.body = {
      ok: true,
      message: "You got a single user",
      user: userFound
    };
  } else {
    response.status = 404;
    response.body = response404
  }
};

export const createUser = async ({ request, response }: { request: Request, response: Response }) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      ok: false,
      message: "Body is required"
    }
  } else {
    const newUser = {
      id: v4.generate(),
      name: body.value.name
    };

    usersDB.push(newUser);

    response.status = 201;
    response.body = {
      ok: true,
      message: "User created"
    };
  }
};

export const updateUser = async ({ request, response, params }: { request: Request, response: Response, params: Params }) => {
  const userFound = usersDB.find(userDB => userDB.id === params.id);

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      ok: false,
      message: "Body is required"
    }
  }

  if (!userFound) {
    response.status = 404;
    response.body = response404;
  } else {
    const body = await request.body();
    const updateUserDB = body.value;

    usersDB = usersDB.map(user => user.id === params.id ? { ...user, ...updateUserDB } : user);

    response.status = 200;
    response.body = {
      ok: true,
      message: "User updated",
      users: usersDB
    };
  }
}

export const deleteUser = ({ response, params }: { response: Response, params: { id: string } }) => {
  usersDB = usersDB.filter(userDB => userDB.id != params.id);

  response.status = 200;
  response.body = {
    ok: true,
    message: "User deleted",
    users: usersDB
  };
};
