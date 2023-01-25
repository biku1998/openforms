import { Prisma } from '@prisma/client';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type FormPresentationSettingUpdatedEventPayload = {
  formId: number;
  payload: Prisma.FormPresentationSettingUpdateInput;
  userId: number;
};

export class FormPresentationSettingUpdatedEvent extends BaseEvent {
  private readonly payload: FormPresentationSettingUpdatedEventPayload;

  constructor(payload: FormPresentationSettingUpdatedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.FORM_PRESENTATION_SETTING_UPDATED,
    });
    this.payload = payload;
  }

  getPayload() {
    return { form_id: this.payload.formId, payload: this.payload };
  }
}
