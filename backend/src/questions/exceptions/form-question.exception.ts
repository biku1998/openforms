import { QuestionType } from '../types/question';

export class InvalidFormQuestionException extends Error {
  constructor({
    formId,
    questionId,
    questionType,
  }: {
    formId: number;
    questionId: number;
    questionType: QuestionType;
  }) {
    super(
      `Question ${questionId} of type ${questionType} cannot be added to form ${formId}. Already added in some other form`,
    );
  }
}

export class FormQuestionNotFoundException extends Error {
  constructor({
    formId,
    questionId,
    questionType,
  }: {
    formId: number;
    questionId: number;
    questionType: QuestionType;
  }) {
    super(
      `Question ${questionId} of type ${questionType} is not present in form ${formId}`,
    );
  }
}

export class DuplicateFormQuestionException extends Error {
  constructor({
    formId,
    questionId,
    questionType,
  }: {
    formId: number;
    questionId: number;
    questionType: QuestionType;
  }) {
    super(
      `Question ${questionId} of type ${questionType} is already present in form ${formId}`,
    );
  }
}
