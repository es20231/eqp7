import { FastifyReply, FastifyRequest } from "fastify";
import { instantiatedUserService } from "../factories/user.factory";
import { MemoryUserRepository } from "../repositories/implementations/memory/user.repository";

const UserService = instantiatedUserService(MemoryUserRepository);

const UserController = {
  getUsers: async (request: FastifyRequest, reply: FastifyReply) => {
    const { ok, message, payload } = await UserService.getUsers();

    if (!ok) reply.code(400).send({ message })

    reply.status(200).send({ message, payload });
  },

  getUserById: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as unknown as {id: string};

    const {ok, message, payload} = await UserService.getUserById(id);
    
    if (!ok) reply.code(400).send({ message })

    reply.status(200).send({ message, payload });
  },

  getUserByUsername: async (request: FastifyRequest, reply: FastifyReply) => {
    const { username } = request.params as unknown as {username: string};

    const {ok, message, payload} = await UserService.getUserByUsername(username);

    if (!ok) reply.code(400).send({ message })

    reply.status(200).send({ message, payload });
  },

  getUserByEmail: async (request: FastifyRequest, reply: FastifyReply) => {
    const { email } = request.params as unknown as {email: string};

    const {ok, message, payload} = await UserService.getUserByEmail(email);

    if (!ok) reply.code(400).send({ message })

    reply.status(200).send({ message, payload });
  },

  createUser: async (request: FastifyRequest, reply: FastifyReply) => {
    // Validate request body with Zod

    const user = request.body;
    
    const {ok, message, payload} = await UserService.createUser(user);

    if (!ok) reply.code(400).send({ message })

    reply.status(201).send({ message, payload });
  },

  updateUser: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as unknown as {id: string};
    const user = request.body;
    
    const {ok, message, payload} = await UserService.updateUser(id, user);

    if (!ok) reply.code(400).send({ message })

    reply.status(200).send({ message, payload });
  },

  deleteUser: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as unknown as {id: string};

    const {ok, message, payload} = await UserService.deleteUser(id);

    if (!ok) reply.code(400).send({ message })

    reply.status(200).send({ message, payload });
  }
}


const LoginController = {
  getLogin: async (request: FastifyRequest, reply: FastifyReply) => {
    const { ok, message, payload } = await UserService.getUsers();

    if (!ok) reply.code(400).send({ message })

    reply.status(200).send({ message, payload });
  },


export { UserController };
