import { AppEventType } from './types/events';

export default abstract class BaseEvent {
  private readonly userId: number;
  private readonly eventType: AppEventType;

  constructor({
    userId,
    eventType,
  }: {
    userId: number;
    eventType: AppEventType;
  }) {
    this.userId = userId;
    this.eventType = eventType;
  }

  getUserId() {
    return this.userId;
  }

  abstract getPayload();

  getEventType() {
    return this.eventType;
  }
}
