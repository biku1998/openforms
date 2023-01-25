import { Session } from 'express-session';

export type UserSession = Session &
  Record<
    'user',
    {
      id: number;
      email: string;
      userAgent: string;
      ipAddress: string;
      lastLogin: string;
    }
  >;

export enum ItemState {
  archived = 'archived',
  active = 'active',
}
