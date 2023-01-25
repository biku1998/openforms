import { Prisma } from '@prisma/client';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type FormQuizSettingCreatedEventPayload = {
  formId: number;
  payload: Prisma.FormQuizSettingCreateInput;
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
    return { form_id: this.payload.formId, payload: this.payload };
  }
}
