import { MemoryUserRepository } from "../repositories/implementations/memory/user.repository";
import { UserService } from "../services/user.service";

const instantiatedUserService = UserService(MemoryUserRepository)

export { instantiatedUserService };
