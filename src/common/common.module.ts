import { Module } from '@nestjs/common';
import { LoggingPlugin } from './logging.plugin';

@Module({
  imports: [LoggingPlugin],
})
export class CommonModule {}
