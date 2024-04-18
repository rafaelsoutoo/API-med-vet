export class UserAlreadyExistsError extends Error {
  constructor() { //chama o método do erro
    super('CPF or Registration already exists.')
  }
}