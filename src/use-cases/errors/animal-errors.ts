export class AnimalNoexists extends Error {
    constructor() {
      super('Animal no exists.')
    }
  }

export class AnimalExist extends Error {
  constructor() {
    super('Cant delete tutor because exists animals in.')
  }
}
