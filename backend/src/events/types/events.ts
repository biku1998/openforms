export enum AppEventType {
  // users
  USER_SIGNED_UP = 'user.signup',
  USER_LOGGED_IN = 'user.login',
  USER_LOGGED_OUT = 'user.logout',

  // forms
  FORM_CREATED = 'form.created',
  FORM_UPDATED = 'form.updated',
  FORM_ARCHIVED = 'form.archived',
  FORM_RESTORED = 'form.restored',
  FORM_PUBLISHED = 'form.published',
  FORM_UNPUBLISHED = 'form.unpublished',
  FORM_QUIZ_SETTING_CREATED = 'form.quiz.setting.created',
  FORM_QUIZ_SETTING_UPDATED = 'form.quiz.setting.updated',
  FORM_QUIZ_SETTING_DELETED = 'form.quiz.setting.deleted',
  FORM_PRESENTATION_SETTING_UPDATED = 'form.presentation.setting.updated',
  FORM_RESPONSE_SETTING_UPDATED = 'form.response.setting.updated',

  // questions
  QUESTION_CREATED = 'question.created',
  QUESTION_UPDATED = 'question.updated',
  QUESTION_ARCHIVED = 'question.archived',
  QUESTION_RESTORED = 'question.restored',
  QUESTION_DELETED = 'question.deleted',

  // options
  OPTION_CREATED = 'option.created',
  OPTION_UPDATED = 'option.updated',
  OPTION_DELETED = 'option.deleted',
}
