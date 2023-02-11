export class FormQuizSettingNotFoundException extends Error {
  constructor({
    formId,
    quizSettingId,
  }: {
    formId: number;
    quizSettingId: number;
  }) {
    super(`Quiz setting ${quizSettingId} is not linked to form ${formId}`);
  }
}

export class FormQuizSettingAlreadyExistException extends Error {
  constructor(formId: number) {
    super(`Form ${formId} quiz setting already exists`);
  }
}
