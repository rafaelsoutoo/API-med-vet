import { createStudent } from '@/http/controllers/users/createStudents'
import { createTeacher } from '@/http/controllers/users/createTeachers'
import { createSecretary } from '@/http/controllers/users/createSecretary'
import { authenticate } from '@/http/controllers/users/authenticate'



import { FastifyInstance } from 'fastify'

export async function  usersRoutes(app: FastifyInstance) {
    app.post('/users/student',{
        schema: {
            description: 'Cria um novo estudante',
            tags: ['students'],
            summary: 'Cria um novo estudante',
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'Nome do estudante' },
                    email: { type: 'string', format: 'email', description: 'Email do estudante' },
                    cpf: { type: 'string', description: 'CPF do estudante' },
                    password: { type: 'string', description: 'Senha do estudante' },
                    registration: { type: 'string', description: 'Matrícula do estudante' },
                    course: { type: 'string', nullable: true, description: 'Curso do estudante' },
                    shift: { type: 'string', nullable: true, description: 'Turno do estudante' },
                    period: { type: 'string', nullable: true, description: 'Período do estudante' },
                    phone: { type: 'string', nullable: true, description: 'Telefone do estudante' },
                },
                required: ['name', 'email', 'cpf', 'password', 'registration']
            },
            response: {
                201: {
                    description: 'Estudante criado com sucesso',
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                },
                409: {
                    description: 'Erro: Estudante já existe',
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            },
            security: [
                {
                    "apiKey": []
                }
            ]
        }
    }, createStudent)

    app.post('/users/teacher', {
        schema: {
            description: 'Cria um novo professor',
            tags: ['teachers'],
            summary: 'Cria um novo professor',
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'Nome do professor' },
                    email: { type: 'string', format: 'email', description: 'Email do professor' },
                    cpf: { type: 'string', description: 'CPF do professor' },
                    password: { type: 'string', description: 'Senha do professor' },
                    registration: { type: 'string', description: 'Matrícula do professor' },
                    course: { type: 'string', nullable: true, description: 'Curso do professor' },
                    shift: { type: 'string', nullable: true, description: 'Turno do professor' },
                    phone: { type: 'string', nullable: true, description: 'Telefone do professor' },
                },
                required: ['name', 'email', 'cpf', 'password', 'registration']
            },
            response: {
                201: {
                    description: 'Professor criado com sucesso',
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                },
                409: {
                    description: 'Erro: Professor já existe',
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            },
            security: [
                {
                    "apiKey": []
                }
            ]
        }
    }, createTeacher )

    app.post('/users/secretary',{
        schema: {
            description: 'Cria uma nova secretária',
            tags: ['secretaries'],
            summary: 'Cria uma nova secretária',
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'Nome da secretária' },
                    email: { type: 'string', format: 'email', description: 'Email da secretária' },
                    cpf: { type: 'string', description: 'CPF da secretária' },
                    password: { type: 'string', description: 'Senha da secretária' },
                    phone: { type: 'string', nullable: true, description: 'Telefone da secretária' },
                },
                required: ['name', 'email', 'cpf', 'password']
            },
            response: {
                201: {
                    description: 'Secretária criada com sucesso',
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                },
                409: {
                    description: 'Erro: Secretária já existe',
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            },
            security: [
                {
                    "apiKey": []
                }
            ]
        }
    },  createSecretary )

    
    app.post('/sessions',{
        schema: {
            description: 'Autentica um usuário relacionado ao professor ou secretária ou aluno ',
            tags: ['authenticate'],
            summary: 'Autentica um usuário',
            body: {
                type: 'object',
                properties: {
                    cpf: { type: 'string', description: 'CPF do usuário' },
                    password: { type: 'string', description: 'Senha do usuário' },
                },
                required: ['cpf', 'password']
            },
            response: {
                200: {
                    description: 'Usuário autenticado com sucesso',
                    type: 'object',
                    properties: {
                        user: { description: 'Dados do usuário' },
                        token: { type: 'string', description: 'Token JWT' },
                    }
                },
                400: {
                    description: 'Erro: Credenciais inválidas',
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            },
            security: [
                {
                    "apiKey": []
                }
            ]
        }
    }, authenticate) //seção de autnhenticate

}