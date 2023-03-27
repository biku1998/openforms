export class QuestionNotFoundException extends Error {
  constructor(id: number) {
    super(`Question ${id} does not exists`);
  }
}

export class ArchivedQuestionException extends Error {
  constructor(id: number) {
    super(
      `Question ${id} is archived. Please restore to perform any operation`,
    );
  }
}
