import { UsersRepository } from "@/repositories/users-repository";
import { NoExistsUsersError } from "../../errors/user-error";

export class GetAllStudentsUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(page: number, numberOfItems: number) {
    const users = await this.usersRepository.findAllStudent(page, numberOfItems);

    if (users.length === 0) {
      throw new NoExistsUsersError()
    }

    return users;
  }
}


export class GetStudentByIdUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(id: string) {
    const user = await this.usersRepository.findById(id)

    return user;
  }
}
export class GetStudentByRegistrationUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(registration: string) {
    const user = await this.usersRepository.findByRegistrationStudent(registration);

    return user;
  }
}
