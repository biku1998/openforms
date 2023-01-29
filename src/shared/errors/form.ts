export class FormNotFoundError extends Error {
  id: number;
  constructor({ message, id }: { message: string; id: number }) {
    super(message);
    this.id = id;
  }
}
