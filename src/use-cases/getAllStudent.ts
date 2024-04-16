import { UsersRepository } from "@/repositories/users-repository"; 

export class GetAllStudentsUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    const users = await this.usersRepository.findAllStudent();
    return users;
  }
}
