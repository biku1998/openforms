import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type FormQuizSettingDeletedEventPayload = {
  formId: number;
  userId: number;
};

export class FormQuizSettingDeletedEvent extends BaseEvent {
  private readonly payload: FormQuizSettingDeletedEventPayload;

  constructor(payload: FormQuizSettingDeletedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.FORM_QUIZ_SETTING_DELETED,
    });
    this.payload = payload;
  }

  getPayload() {
    return { form_id: this.payload.formId };
  }
}
