import { Injectable } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class UploadService {
  private blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_STRING || '',
  );
  //   private containerName = 'start-pitcher';
  async uploadFile(
    file: Express.Multer.File,
    containerName: string,
  ): Promise<string> {
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    if (!file || !file.originalname) {
      throw new Error('Invalid file input');
    }

    const tempName = `${uuidv4()}${path.extname(file.originalname)}_${file.originalname}`;
    const blobName = encodeURIComponent(tempName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    console.log('@@@@ uuid : ', uuidv4());
    console.log('file.originalname @@ : ', file.originalname);
    console.log('containerName @@ : ', containerName);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: {
        blobContentType: file.mimetype,
      },
    });

    return blockBlobClient.url;
  }
}
