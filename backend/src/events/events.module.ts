import { Global, Module } from '@nestjs/common';
import { GlobalEventListenerService } from './services/global-event.listener.service';
import { EventLoggerService } from './services/event-logger.service';

@Global()
@Module({
  providers: [EventLoggerService, GlobalEventListenerService],
  exports: [EventLoggerService, GlobalEventListenerService],
})
export class EventsModule {}
