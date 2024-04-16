import { UsersRepository } from "@/repositories/users-repository"; 

export class GetAllTeachersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    const users = await this.usersRepository.findAllTeachers();
    return users;
  }
}
