import { NoExistsUsersError } from "@/use-cases/errors/user-error"
import { UsersRepository } from "@/repositories/users-repository"

interface DeleteUseCaseRequest {
  id: string
};

export class DeleteTeacherUseCase {

  constructor(
    private usersRepository: UsersRepository
  ) { }

  async execute({ id }: DeleteUseCaseRequest) {


    const userExists = await this.usersRepository.findTeacherById(id);

    if (!userExists) {
      throw new NoExistsUsersError();
    };

    await this.usersRepository.deleteTeacher(id);
  };
}