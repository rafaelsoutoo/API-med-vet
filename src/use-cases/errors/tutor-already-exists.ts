export class TutorAlreadyExistsError extends Error {
  constructor() {
    super('Tutor already exists.')
  }
}
