import { UsersRepository } from "@/repositories/users-repository";
import { NoExistsUsersError } from "../../errors/user-error";
import { studentNotFound } from "@/use-cases/errors/student-errors";
import { Student } from "@prisma/client";




interface SearchStudentUseCaseRequest {
  query: string
  page: number
}

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
    const user = await this.usersRepository.findStudentById(id)

    if (!user) {
      throw new studentNotFound()
    }

    return user;
  }
}


export class GetStudentByRegistrationUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute( query: string, page:number ): Promise<Student[]> {
    const user = await this.usersRepository.searchStudentByRegistration(query, page)

    if (user.length === 0) {
      throw new studentNotFound()
    }

    return user;
  }
}
