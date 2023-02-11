import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { Public } from './utils/public.decorator';

@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  @Public()
  @Get()
  index() {
    return 'ok';
  }
}
