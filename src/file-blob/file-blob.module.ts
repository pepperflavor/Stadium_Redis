import { Module } from '@nestjs/common';

import { DownloadModule } from './download/download.module';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';

@Module({
  controllers: [UploadController],
  providers: [],
  imports: [DownloadModule, UploadModule],
})
export class FileBlobModule {}
