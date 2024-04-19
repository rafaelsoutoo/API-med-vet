export const sessionsSchema =  {
    description: 'Autentica um usuário relacionado ao professor ou secretária ou aluno ',
    tags: ['authenticate'],
    summary: 'Autentica um usuário',
    body: {
        type: 'object',
        properties: {
            cpf: { type: 'string', description: 'CPF do usuário  (obrigatório)' },
            password: { type: 'string', description: 'Senha do usuário  (obrigatório)' },
        },
        required: ['cpf', 'password']
    },
    response: {
        200: {
            description: 'Usuário autenticado com sucesso',
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', description: 'ID do usuário' },
                        name: { type: 'string', description: 'Nome do usuário' },
                        cpf: { type: 'string', description: 'CPF do usuário' },
                        password_hash: { type: 'string', description: 'Hash da senha do usuário' },
                        email: { type: 'string', description: 'Email do usuário' },
                        registration: { type: 'string', description: 'Registro do usuário' },
                        course: { type: 'string', description: 'Curso do usuário' },
                        shift: { type: 'string', description: 'Turno do usuário' },
                        phone: { type: 'string', description: 'Telefone do usuário' },
                        role: { type: 'string', description: 'Função do usuário' },
                        created_at: { type: 'string', description: 'Data de criação do usuário' },
                    },
                    required: ['id', 'name', 'cpf', 'password_hash', 'email', 'registration', 'course', 'shift', 'phone', 'role', 'created_at']
                },
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