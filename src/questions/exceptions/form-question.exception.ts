export class InvalidFormQuestionLinkException extends Error {
  constructor({ formId, questionId }: { formId: number; questionId: number }) {
    super(
      `Question ${questionId} cannot be linked to form ${formId}. Already linked to some other form`,
    );
  }
}

export class FormQuestionLinkNotFoundException extends Error {
  constructor({ formId, questionId }: { formId: number; questionId: number }) {
    super(`Question ${questionId} is not linked to form ${formId}`);
  }
}

export class DuplicateFormQuestionException extends Error {
  constructor({ formId, questionId }: { formId: number; questionId: number }) {
    super(`Question ${questionId} already linked to form ${formId}`);
  }
}
