export class QuestionNotFoundException extends Error {
  constructor(id: number) {
    super(`Question ${id} does not exists`);
  }
}
