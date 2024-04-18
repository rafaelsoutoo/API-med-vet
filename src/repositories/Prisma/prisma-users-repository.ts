import { UsersRepository } from '@/repositories/users-repository'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'



export class PrismaUsersRepository implements UsersRepository {

  async findById(id: string) {
    const user = await prisma.student.findUnique({ //pelo id retorna o usuário
      where: {
        id,
      },
    })

    return user
  }
  async findTeacherById(id: string) {
    const user = await prisma.teacher.findUnique({ //pelo teacher retorna o usuário
      where: {
        id,
      },
    })

    return user
  }
  async findByRegistrationStudent(registration: string) {
    const user = await prisma.student.findUnique({
      where: {
        registration,
      },
    })

    return user
  }
  async findByRegistrationTeachers(registration: string) {
    const user = await prisma.teacher.findUnique({
      where: {
        registration,
      },
    })

    return user
  }

  async findAllStudent(page: number, numberOfItems: number) {

    const skipItens = (page - 1) * numberOfItems

    const users = await prisma.student.findMany({
      take: numberOfItems,
      skip: skipItens,
    });

    const usersWithPasswordHash = users.map(user => ({
      ...user,
      password_hash: '',
    }));

    return usersWithPasswordHash;
  }

  async findAllTeachers(page: number, numberOfItems: number) {
    const skipItems = (page - 1) * numberOfItems;

    const users = await prisma.teacher.findMany({
      take: numberOfItems,
      skip: skipItems,
    });

    const usersWithPasswordHash = users.map(user => ({
      ...user,
      password_hash: '',
    }));

    return usersWithPasswordHash;
  }



  async findByCpfStudent(cpf: string) {
    const user = await prisma.student.findUnique({   // Este comando usa o Prisma para buscar um usuário único no banco de dados onde o campo de e-mail corresponde ao e-mail fornecido.
      where: {
        cpf,
      },
    })

    return user
  }

  async findByCpfTeacher(cpf: string) {
    const user = await prisma.teacher.findUnique({   // Este comando usa o Prisma para buscar um usuário único no banco de dados onde o campo de e-mail corresponde ao e-mail fornecido.
      where: {
        cpf,
      },
    })

    return user
  }

  async findByCpfSecretary(cpf: string) {
    const user = await prisma.secretary.findUnique({   // Este comando usa o Prisma para buscar um usuário único no banco de dados onde o campo de e-mail corresponde ao e-mail fornecido.
      where: {
        cpf,
      },
    })

    return user
  }

  async createStudent(data: Prisma.StudentCreateInput) {  //cria no banco de dados
    const user = await prisma.student.create({
      data,
    })

    return user
  }

  async createTeachers(data: Prisma.TeacherCreateInput) {  //cria no banco de dados
    const user = await prisma.teacher.create({
      data,
    })

    return user
  }

  async createSecretarys(data: Prisma.TeacherCreateInput) {  //cria no banco de dados
    const user = await prisma.secretary.create({
      data,
    })

    return user
  }

}