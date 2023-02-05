export class FormNotFoundException extends Error {
  constructor(id: number) {
    super(`Form ${id} does not exists`);
  }
}
