import { QuestionType } from '../types/question';

export class InvalidQuestionOptionException extends Error {
  constructor({
    optionId,
    questionId,
    questionType,
  }: {
    optionId: number;
    questionId: number;
    questionType: QuestionType;
  }) {
    super(
      `Option ${optionId} cannot be added to question ${questionId} of type ${questionType}. Already added in some other question`,
    );
  }
}

export class OptionNotFoundException extends Error {
  constructor(id: number) {
    super(`Option ${id} does not exists`);
  }
}

export class ArchivedOptionException extends Error {
  constructor(id: number) {
    super(`Option ${id} is archived. Please restore to perform any operation`);
  }
}

export class DuplicateQuestionOptionException extends Error {
  constructor({
    optionId,
    questionId,
    questionType,
  }: {
    optionId: number;
    questionId: number;
    questionType: QuestionType;
  }) {
    super(
      `Option ${optionId} is already present in question ${questionId} of type ${questionType}`,
    );
  }
}
