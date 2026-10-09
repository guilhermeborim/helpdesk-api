export class InvalidStatusTransition extends Error {
  constructor() {
    super("Invalid status transition!");
  }
}
