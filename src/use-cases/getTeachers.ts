import { UsersRepository } from "@/repositories/users-repository";

export class GetAllTeachersUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(page: number, numberOfItems: number) {
    const users = await this.usersRepository.findAllTeachers(page, numberOfItems);
    return users;
  }
}
