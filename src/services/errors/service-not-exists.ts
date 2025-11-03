export class ServiceNotExists extends Error {
  constructor() {
    super("Service does not exist!");
  }
}
