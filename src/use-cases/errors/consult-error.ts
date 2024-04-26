export class ConsultsNotExistsError extends Error {
    constructor() {
      super("Consult dont exits!")
    };
  }