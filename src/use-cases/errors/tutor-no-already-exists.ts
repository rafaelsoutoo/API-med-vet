export class TutorNoExistsError extends Error {
    constructor() {
      super('Tutor does not exist.')
    }
  }
  