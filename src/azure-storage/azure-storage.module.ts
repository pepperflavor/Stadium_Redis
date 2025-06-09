import { Module } from '@nestjs/common';
import { AzureStorageService } from './azure-storage.service';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AzureStorageService],
  exports: [AzureStorageService],
})
export class AzureStorageModule {}
