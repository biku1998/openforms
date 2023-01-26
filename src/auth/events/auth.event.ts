import { Prisma } from '@prisma/client';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type UserSignedUpEventPayload = {
  payload: Prisma.UserCreateInput;
  userId: number;
};
export class UserSignedUpEvent extends BaseEvent {
  private readonly payload: UserSignedUpEventPayload;
  constructor(payload: UserSignedUpEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.USER_SIGNED_UP,
    });
    this.payload = payload;
  }
  getPayload() {
    return { payload: this.payload.payload };
  }
}

export class UserLoggedInEvent extends BaseEvent {
  constructor(payload: { userId: number }) {
    super({
      userId: payload.userId,
      eventType: AppEventType.USER_LOGGED_IN,
    });
  }
  getPayload() {
    return {};
  }
}

export class UserLoggedOutEvent extends BaseEvent {
  constructor(payload: { userId: number }) {
    super({
      userId: payload.userId,
      eventType: AppEventType.USER_LOGGED_OUT,
    });
  }
  getPayload() {
    return {};
  }
}
