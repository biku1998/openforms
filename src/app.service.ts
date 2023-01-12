import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHealth() {
    // TODO: implement the database health check later
    return {
      health: {
        app: 'ok',
        database: 'ok',
      },
    };
  }
}
