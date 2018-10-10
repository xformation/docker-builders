export class Serializable {
    constructor(json?: any) {
      if (json) {
        Object.assign(this, json);
      }
    }
  }