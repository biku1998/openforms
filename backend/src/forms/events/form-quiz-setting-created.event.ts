import { Prisma } from '@prisma/client';
import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type FormQuizSettingCreatedEventPayload = {
  formId: number;
  payload: Pick<
    Prisma.FormQuizSettingCreateInput,
    | 'defaultPointValue'
    | 'releaseScoreImmediately'
    | 'viewMissedQuestions'
    | 'viewCorrectAnswers'
    | 'viewPointValues'
  >;
  userId: number;
};

export class FormQuizSettingCreatedEvent extends BaseEvent {
  private readonly payload: FormQuizSettingCreatedEventPayload;

  constructor(payload: FormQuizSettingCreatedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.FORM_QUIZ_SETTING_CREATED,
    });
    this.payload = payload;
  }

  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
