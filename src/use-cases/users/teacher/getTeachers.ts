import { UsersRepository } from "@/repositories/users-repository";
import { NoExistsUsersError } from "../../errors/user-error";

 
export class GetAllTeachersUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(page: number, numberOfItems: number) {
    const users = await this.usersRepository.findAllTeachers(page, numberOfItems);

    if (users.length === 0) {
      throw new NoExistsUsersError
    }

    return users;
  }
}


export class GetTeacherByIdUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(id: string) {
    const user = await this.usersRepository.findTeacherById(id);


    return user;
  }
}


export class GetTeachersByRegistrationUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(registration: string) {
    const user = await this.usersRepository.findByRegistrationTeachers(registration);

    return user;
  }
}


export class SearchTeacherByNameUseCase {
  constructor(private userRepository: UsersRepository) { }

  async execute(query: string,page: number){

    try {
      const user = await this.userRepository.findTeacherByName(query, page)

      return user
    } catch {
      throw new NoExistsUsersError()
    };
  };

}


