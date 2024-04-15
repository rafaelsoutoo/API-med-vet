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