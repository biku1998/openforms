import { Prisma } from '@prisma/client';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type FormQuizSettingUpdatedEventPayload = {
  formId: number;
  payload: Prisma.FormQuizSettingUpdateInput;
  userId: number;
};

export class FormQuizSettingUpdatedEvent extends BaseEvent {
  private readonly payload: FormQuizSettingUpdatedEventPayload;

  constructor(payload: FormQuizSettingUpdatedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.FORM_QUIZ_SETTING_UPDATED,
    });
    this.payload = payload;
  }

  getPayload() {
    return { form_id: this.payload.formId, payload: this.payload };
  }
}
