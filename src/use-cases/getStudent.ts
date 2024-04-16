import { UsersRepository } from "@/repositories/users-repository";

export class GetAllStudentsUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute() {
    const users = await this.usersRepository.findAllStudent();
    return users;
  }
}


export class GetStudentByIdUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('Student not found');
    }

    return user;
  }
}
