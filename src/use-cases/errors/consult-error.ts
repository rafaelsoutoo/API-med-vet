export class ConsultsNotExistsError extends Error {
  constructor() {
    super("Consult dont exits!")
  };
}

export class ConsultsNotExitsError extends Error {
  constructor() {
    super("Consult dont exits!")
  };
}

export class getAllConsultsError extends Error {
  constructor() {
    super("Error in get all consults from database")
  };
}
