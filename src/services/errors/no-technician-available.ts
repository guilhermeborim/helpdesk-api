export class NoTechnicianAvailable extends Error {
  constructor() {
    super("No momento não temos técnicos disponíveis.");
  }
}
