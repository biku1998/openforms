export class FormNotFoundException extends Error {
  constructor(id: number) {
    super(`Form ${id} does not exists`);
  }
}

export class ArchivedFormException extends Error {
  constructor(id: number) {
    super(`Form ${id} is archived. Please restore to perform any operation`);
  }
}
