export class UserAlreadyRegisteredException extends Error {
  constructor(email: string) {
    super(`Email ${email} already registered`);
  }
}
