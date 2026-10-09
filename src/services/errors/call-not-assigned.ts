export class CallNotAssigned extends Error {
  constructor() {
    super("Call is not assigned to this technician!");
  }
}
