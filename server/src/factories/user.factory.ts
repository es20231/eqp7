import { IUserRepository } from "../repositories/iuser.repository";
import { UserService } from "../services/user.service";

const instantiatedUserService = (repository: IUserRepository) =>
  UserService(repository);

export { instantiatedUserService };
