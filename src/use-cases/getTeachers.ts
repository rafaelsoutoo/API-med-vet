import { UsersRepository } from "@/repositories/users-repository";

export class GetAllTeachersUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(page: number, numberOfItems: number) {
    const users = await this.usersRepository.findAllTeachers(page, numberOfItems);
    return users;
  }
}

export class GetTeacherByIdUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(id: string) {
    const user = await this.usersRepository.findTeacherById(id);

    if (!user) {
      throw new Error('Teacher not found');
    }

    return user;
  }
}

export class GetTeachersByRegistrationUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(registration: string) {
    const user = await this.usersRepository.findByRegistrationTeachers(registration);

    if (!user) {
      throw new Error('Teacher not found');
    }

    return user;
  }
}


