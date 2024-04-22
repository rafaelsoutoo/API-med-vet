export class NoExistsUsersError extends Error {
    constructor() {
        super('No exists users.')
    }
}