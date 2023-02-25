import { User } from '@prisma/client';
import { Request } from 'express';

export enum ItemState {
  archived = 'archived',
  active = 'active',
}

export type RequestWithUser = Request & Record<'user', User>;
