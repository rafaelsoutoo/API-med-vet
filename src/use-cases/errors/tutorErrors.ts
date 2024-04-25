export class TutorNotExistsError extends Error {
    constructor() {
        super('Tutor does not exist.')
    }
}

export class TutorAlreadyExistsError extends Error {
    constructor() {
        super('Tutor already exists.')
    }
}
  
export class getAllTutorsError extends Error {
constructor() {
    super("Error in get all tutors from database")
};
}
