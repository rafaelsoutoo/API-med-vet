import { NoExistsUsersError } from "@/use-cases/errors/user-error"
import { UsersRepository } from "@/repositories/users-repository"

interface DeleteUseCaseRequest {
  id: string
}

export class DeleteSecretaryUseCase {

  constructor(
    private usersRepository: UsersRepository
  ) { }

  async execute({ id }: DeleteUseCaseRequest) {


    const userExists = await this.usersRepository.findSecretaryById(id)

    if (!userExists) { 
      throw new NoExistsUsersError()
    }

    await this.usersRepository.deleteSecretary(id)

  }
}