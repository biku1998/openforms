import { Prisma } from '@prisma/client';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type FormResponseSettingUpdatedEventPayload = {
  formId: number;
  payload: Prisma.FormResponseSettingUpdateInput;
  userId: number;
};

export class FormResponseSettingUpdatedEvent extends BaseEvent {
  private readonly payload: FormResponseSettingUpdatedEventPayload;

  constructor(payload: FormResponseSettingUpdatedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.FORM_RESPONSE_SETTING_UPDATED,
    });
    this.payload = payload;
  }

  getPayload() {
    return { form_id: this.payload.formId, payload: this.payload };
  }
}
