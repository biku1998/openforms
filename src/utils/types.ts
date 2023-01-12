import { Session } from 'express-session';

export type UserSession = Session &
  Record<
    'user',
    {
      userId: number;
      userEmail: string;
      userAgent: string;
      ipAddress: string;
      lastLogin: string;
    }
  >;
